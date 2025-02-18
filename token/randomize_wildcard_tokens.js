// quickly change a token and its corresponding unlinked actor

async function renameToken(newName)
{
    let tokenUpdates = [];
    for (const token of canvas.tokens.controlled) {
        tokenUpdates.push({_id: token.id, name: newName});
        await token.actor.update({'name' : newName}); //for linked actors it would change the actor in the library. So keep in mind!
    }
    await canvas.scene.updateEmbeddedDocuments("Token", tokenUpdates);
}            

let applyChanges=false;
new Dialog({
  title: `Rename token & actor`,
  content: `
    <form>
      <div class="form-group">
        <input type="text" id="new-name" name="new-name"/>
        <label for="new-name">New Name</label>
      </div>
    </form>
    `,
  buttons: {
    yes: {
      icon: "<i class='fas fa-check'></i>",
      label: `Apply Changes`,
      callback: () => applyChanges = true
    },
    no: {
      icon: "<i class='fas fa-times'></i>",
      label: `Cancel Changes`
    },
  },
  default: "yes",
  close: html => {
      if (applyChanges) {
            let newName = html.find('[name="new-name"]')[0].value || null;
            if(newName) 
                renameToken(newName);
        }
    }
}).render(true);