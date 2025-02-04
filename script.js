var clicker = {
    clicks: 0,
    upgrades: {
        clicker_machine: {
            amount: 0,
            cost: 25,
            cps: 1,
            name: "Click Machine #1"
        },
        click_machine_2: {
            amount: 0,
            cost: 50,
            cps: 3,
            name: "Click Machine #2"
        },
        click_machine_3: {
            amount: 0,
            cost: 100,
            cps: 6,
            name: "Click Machine #3"
        },
        click_machine_4: {
            amount: 0,
            cost: 200,
            cps: 12,
            name: "Click Machine #4"
        },
        click_machine_5: {
            amount: 0,
            cost: 400,
            cps: 24,
            name: "Click Machine #5"
        }
    }
};

function thing_clicked(thing) {
    if (thing === "clicks") {
        clicker.clicks++;
        updateUI();
    }
}

function buyUpgrade(upgrade) {
    if (clicker.clicks >= clicker.upgrades[upgrade].cost) {
        clicker.clicks -= clicker.upgrades[upgrade].cost;
        clicker.upgrades[upgrade].amount++;
        clicker.upgrades[upgrade].cost = Math.floor(clicker.upgrades[upgrade].cost * 2);
        updateUI();
    }
}

function updatecount() {
    setInterval(() => {
        for (let i in clicker.upgrades) {
            clicker.clicks += (clicker.upgrades[i].amount * clicker.upgrades[i].cps) / 20;
        }
        updateUI();
    }, 50);
}

function updateUI() {
    document.querySelector("#Clicks").innerHTML = "You have " + Math.floor(clicker.clicks) + " Clicks";
    document.querySelector("#UpgradeClickerMachine").innerHTML = "Buy Click Machine #1 (" + clicker.upgrades.clicker_machine.cost + " Clicks)";
    document.querySelector("#UpgradeClickMachine2").innerHTML = "Buy Click Machine #2 (" + clicker.upgrades.click_machine_2.cost + " Clicks)";
    document.querySelector("#UpgradeClickMachine3").innerHTML = "Buy Click Machine #3 (" + clicker.upgrades.click_machine_3.cost + " Clicks)";
    document.querySelector("#UpgradeClickMachine4").innerHTML = "Buy Click Machine #4 (" + clicker.upgrades.click_machine_4.cost + " Clicks)";
    document.querySelector("#UpgradeClickMachine5").innerHTML = "Buy Click Machine #5 (" + clicker.upgrades.click_machine_5.cost + " Clicks)";
}

// ✅ Fonction pour sauvegarder la partie avec un nom personnalisé
function saveGame() {
    let fileName = prompt("Enter a name for your save file:", "clicker_game_save");

    // Si l'utilisateur annule ou entre une valeur vide, on ne fait rien
    if (fileName === null || fileName.trim() === "") {
        return;  // On sort de la fonction, donc aucun fichier n'est téléchargé
    }

    fileName += ".txt";  // Ajoute l'extension .txt

    let saveData = JSON.stringify(clicker, null, 2);
    let blob = new Blob([saveData], { type: "text/plain" });
    let a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}

// ✅ Fonction pour charger une sauvegarde depuis un fichier .txt
function loadGame() {
    document.getElementById("loadFile").click();
}

function handleFileUpload(event) {
    let file = event.target.files[0];
    if (!file) return;

    let reader = new FileReader();
    reader.onload = function(e) {
        try {
            let data = JSON.parse(e.target.result);
            if (data && data.clicks !== undefined && data.upgrades) {
                clicker = data;
                updateUI();
            } else {
                alert("Invalid save file.");
            }
        } catch (error) {
            alert("Error loading save file.");
        }
    };
    reader.readAsText(file);
}
