---
name: Route content visibility
description: Why content visibility must not depend on a one-time JavaScript observer.
---

Route content must remain visible without JavaScript. Do not use a one-time observer that first hides all matching elements.

**Why:** With App Router client navigation, elements introduced after the observer mounts can remain permanently hidden even though direct page loads look correct.

**How to apply:** Use progressive enhancement for motion. Keep the default and post-navigation state visible, and verify changes by clicking between routes in a real browser.