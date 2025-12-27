# Infrastructure as Code - Reference

## Overview

This directory contains infrastructure configuration that references the **DevOps Productivity Suite** Terraform setup.

## Reference Implementation

**Full Terraform setup:** `/Users/ky/devops-productivity-suite-site/infrastructure/`

### Key Files

- `main.tf` - Main infrastructure configuration
- `variables.tf` - Infrastructure variables
- `outputs.tf` - Output values
- `terraform.tfvars` - Variable values (not in git)

## Principles (from DevOps Suite)

1. **Declarative over Imperative** - Define what, not how
2. **State Management** - Terraform state is source of truth
3. **Drift Detection** - Monitor for unauthorized changes
4. **No Hardcoding** - Use variables for configuration
5. **Modularity** - Use modules, don't copy-paste

## Setup

1. **Review the reference:**
   ```bash
   cat /Users/ky/devops-productivity-suite-site/INFRASTRUCTURE.md
   ```

2. **Copy Terraform files:**
   ```bash
   cp /Users/ky/devops-productivity-suite-site/infrastructure/*.tf \
      projects/09-deployment-strategies/solution/infrastructure/
   ```

3. **Initialize Terraform:**
   ```bash
   cd projects/09-deployment-strategies/solution/infrastructure
   terraform init
   terraform plan
   ```

## Pre-commit Hooks

Use the existing Terraform formatting setup:

```bash
cd /Users/ky/devops-productivity-suite-site
./scripts/setup-terraform-pre-commit.sh
```

This automatically formats Terraform files before commits.

## Next Steps

1. Review DevOps Suite infrastructure
2. Adapt for this project's needs
3. Set up remote state (S3, etc.)
4. Configure variables
5. Deploy infrastructure

---

**Remember:** Infrastructure as Code means version-controlled, reproducible infrastructure.

