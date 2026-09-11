---
name: Portable npm lockfiles
description: Keep npm lockfiles usable on Replit and external deployment providers.
---

Configure npm to omit registry-specific `resolved` URLs from the lockfile.

**Why:** Replit installs through an internal package firewall. Persisting those internal tarball URLs makes external builders such as Vercel fail because the hostname is unreachable outside Replit.

**How to apply:** Keep `omit-lockfile-registry-resolved=true` in the project npm configuration and avoid committing competing package-manager lockfiles when npm is the intended package manager.