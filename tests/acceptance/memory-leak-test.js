import { test } from 'qunit';
import moduleForAcceptance from 'memory-leak/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | memory leak');

test('visiting /memory-leak', async function(assert) {
  await visit('/memory-leak');

  assert.equal(currentURL(), '/memory-leak');
});
