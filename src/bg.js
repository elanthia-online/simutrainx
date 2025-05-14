chrome.runtime.onInstalled.addListener(addPageScript);

async function addPageScript() {
  const scripts = [{
    id: 'no-alert',
    js: ['src/service-worker/no-alert.js'],
    matches: ['https://www.play.net/gs4/play/cm/trainer.asp'],
    runAt: 'document_start',
    world: 'MAIN',
  }];
  const ids = scripts.map(s => s.id);
  //await chrome.scripting.unregisterContentScripts({ ids }).catch(() => {});
  await chrome.scripting.registerContentScripts(scripts);
}