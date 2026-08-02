# GitHub Pages Rollback

This runbook restores a previously green static deployment without changing DNS,
bypassing the quality gate, or force-pushing `main`.

## Preferred rollback

1. In **Actions → Deploy to GitHub Pages**, locate the last successful run for
   the commit that should be restored.
2. Record the current deployment run and commit SHA for the incident report.
3. Use **Re-run all jobs** on the selected successful run. The workflow rebuilds
   that commit from `package-lock.json`, runs the complete quality gate, uploads a
   fresh Pages artifact, and deploys it through the `github-pages` environment.
4. Confirm that the new deployment job completed, then smoke-test `/fa/`, `/en/`,
   `/fa/rss.xml`, `/en/rss.xml`, `/sitemap-index.xml`, `/pagefind/`, and a missing
   route that should return the custom `404.html`.
5. Record the rollback run ID, restored commit SHA, verification results, and the
   reason for rollback.

## Revert fallback

If the historical workflow cannot be re-run, revert the faulty commit through a
pull request. Let the PR CI pass, merge the revert into `main`, and allow the
normal Pages workflow to build and deploy the revert commit. Do not rewrite
published history.

## Boundaries

- Do not edit `public/CNAME`, DNS records, or HTTPS settings as an application
  rollback step.
- Do not manually upload an unvalidated `dist` directory or deploy an artifact
  from a failed workflow.
- Pages source selection, environment protection, custom-domain verification,
  DNS, and production smoke evidence belong to `TASK-0602` and require owner
  access and approval.
