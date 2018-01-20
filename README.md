# Memory leak

According to [this page](https://github.com/ember-best-practices/memory-leak-examples), after any tests execution, there should be no "Container" object in heap snapshot. If there is one, it means there is a memory leak.

I believe I found one reproducible case.

"action" helper in hbs, when used via a test implemented with async/await will leak memory.

This does not happen if the test is written in old style (with `waitFor`).

## Reproduction steps

1. `yarn`
2. `ember s`
3. open Chrome browser
4. visit "/tests"
5. select "Acceptance | memory leak" module
6. let the tests run
7. open console, Memory tab
8. Take heap snapshot
9. Filter for "Container"
10. There is a container object in heap

There should not be a container object in heap at this point. It does not happen if "action" helper is not used, or if the test is not async/await.

As far as I was able to confirm, this happens for all version of `ember-source` from 2.11 to 2.18, also on 3.0.0-beta.3.

In my application there is more than 1300 tests, compiling a lot of templates in which we use `{{action "actionName"}}`, all tests async. This seems to add to a lot of leaked memory.
