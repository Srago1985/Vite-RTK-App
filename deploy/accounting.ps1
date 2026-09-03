[CmdletBinding()]
param(
    [ValidateSet('Status', 'Start', 'Stop', 'BuildPush')]
    [string]$Action = 'Status'
)

$ErrorActionPreference = 'Stop'

$Aws = 'C:\Program Files\Amazon\AWSCLIV2\aws.exe'
if (-not (Test-Path $Aws)) {
    $Aws = 'aws'
}

$Region = 'us-east-1'
$Account = '689217346083'
$Registry = "$Account.dkr.ecr.$Region.amazonaws.com"
$Cluster = 'accounting-test'
$FrontendService = 'accounting-frontend'
$BackendService = 'accounting-backend'
$FrontendImage = "$Registry/accounting:latest"
$AlbDns = 'accounting-alb-1843822330.us-east-1.elb.amazonaws.com'
$TargetGroupArn = 'arn:aws:elasticloadbalancing:us-east-1:689217346083:targetgroup/accounting-frontend-tg/55a09634b691c7ba'

function Invoke-Aws {
    param([Parameter(Mandatory)][string[]]$Arguments)
    & $Aws @Arguments
    if ($LASTEXITCODE -ne 0) {
        throw "AWS command failed: aws $($Arguments -join ' ')"
    }
}

function Show-Status {
    Write-Host '--- ECS services ---'
    Invoke-Aws @('ecs', 'describe-services', '--cluster', $Cluster, '--services', $BackendService, $FrontendService, '--region', $Region, '--query', 'services[].{Name:serviceName,Desired:desiredCount,Running:runningCount,Pending:pendingCount,Status:status}', '--output', 'table')

    Write-Host '--- Frontend target health ---'
    Invoke-Aws @('elbv2', 'describe-target-health', '--target-group-arn', $TargetGroupArn, '--region', $Region, '--query', 'TargetHealthDescriptions[].{Target:Target.Id,State:TargetHealth.State,Reason:TargetHealth.Reason}', '--output', 'table')

    Write-Host '--- ALB HTTP ---'
    try {
        $response = Invoke-WebRequest -Uri "http://$AlbDns/" -UseBasicParsing -TimeoutSec 10
        Write-Host "HTTP $($response.StatusCode)"
    } catch {
        Write-Host "HTTP unavailable: $($_.Exception.Message)"
    }
}

switch ($Action) {
    'Status' {
        Show-Status
    }
    'Start' {
        Invoke-Aws @('ecs', 'update-service', '--cluster', $Cluster, '--service', $BackendService, '--desired-count', '1', '--region', $Region, '--query', 'service.serviceName', '--output', 'text')
        Invoke-Aws @('ecs', 'update-service', '--cluster', $Cluster, '--service', $FrontendService, '--desired-count', '1', '--region', $Region, '--query', 'service.serviceName', '--output', 'text')
        Show-Status
    }
    'Stop' {
        Invoke-Aws @('ecs', 'update-service', '--cluster', $Cluster, '--service', $BackendService, '--desired-count', '0', '--region', $Region, '--query', 'service.serviceName', '--output', 'text')
        Invoke-Aws @('ecs', 'update-service', '--cluster', $Cluster, '--service', $FrontendService, '--desired-count', '0', '--region', $Region, '--query', 'service.serviceName', '--output', 'text')
        Show-Status
    }
    'BuildPush' {
        Push-Location (Join-Path $PSScriptRoot '..')
        try {
            Invoke-Aws @('ecr', 'get-login-password', '--region', $Region) | docker login --username AWS --password-stdin $Registry
            if ($LASTEXITCODE -ne 0) {
                throw 'Docker login to ECR failed'
            }
            docker build -f dockerfile -t $FrontendImage .
            if ($LASTEXITCODE -ne 0) {
                throw 'Frontend Docker build failed'
            }
            docker push $FrontendImage
            if ($LASTEXITCODE -ne 0) {
                throw 'Frontend Docker push failed'
            }
        } finally {
            Pop-Location
        }
        Show-Status
    }
}
