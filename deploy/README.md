# AWS deployment helpers

These commands operate the existing `accounting-test` ECS environment in `us-east-1`.
They do not contain AWS credentials or MongoDB secrets.

Run from PowerShell in this directory:

```powershell
Set-ExecutionPolicy -Scope Process Bypass
.\accounting.ps1 -Action Status
```

## Common commands

```powershell
# Check ECS services, ALB target health and public HTTP status
.\accounting.ps1 -Action Status

# Start both ECS services
.\accounting.ps1 -Action Start

# Stop both ECS tasks to reduce Fargate usage
.\accounting.ps1 -Action Stop

# Build and push the frontend image to ECR
.\accounting.ps1 -Action BuildPush
```

## Saved AWS resources

- ECS cluster: `accounting-test`
- ECS services: `accounting-backend`, `accounting-frontend`
- Frontend ECR: `689217346083.dkr.ecr.us-east-1.amazonaws.com/accounting:latest`
- Backend ECR: `689217346083.dkr.ecr.us-east-1.amazonaws.com/forum-service:latest`
- Cloud Map service: `backend` in namespace `backend-local`
- ALB: `accounting-alb-1843822330.us-east-1.elb.amazonaws.com`
- SSM path: `/accounting/test/*`
- VPC: `vpc-06c9542fe21cb109f` (`10.0.0.0/16`)
- Public subnets: `subnet-006840393bbeb6e77`, `subnet-0660a48ea365dc0d6`
- Private subnets: `subnet-06b23aceb55df923f`, `subnet-097e4dd5f201185db`
- Frontend security group: `sg-0ca2f76cfed0a173c`
- Backend security group: `sg-0c310e2f263a7686f`

For production, create a separate `/accounting/prod/*` SSM path and replace the test CORS origin.
