document.addEventListener("DOMContentLoaded", () => {
    const displayButton = document.getElementById("display-button");
    const searchButton = document.getElementById("search-button");
    const clearButton = document.getElementById("clear-button");
    const teamList = document.getElementById("team-list");
  
    displayButton.addEventListener("click", () => {
      fetchTeams();
    });
  
    searchButton.addEventListener("click", () => {
      const teamNameInput = document.getElementById("team-name");
      const teamName = teamNameInput.value;
      
      if (teamName.trim() === "") {
        teamList.innerHTML = "Nu există input.";
        return;
      }
  
      fetchTeam(teamName);
    });
  

    clearButton.addEventListener("click", () => {
      teamList.innerHTML = "";
    });
  
    function fetchTeams() {
      fetch("http://localhost:3000/teams")
        .then(response => response.json())
        .then(teams => {
          if (teams && teams.length > 0) {
            teamList.innerHTML = "";
            teams.forEach(team => {
              const teamItem = createTeamItem(team);
              teamList.appendChild(teamItem);
            });
          } else {
            teamList.innerHTML = "Nu există echipe.";
          }
        })
        .catch(error => {
          console.error("Eroare la obținerea echipelelor:", error);
        });
    }
  
    function fetchTeam(teamName) {
      fetch(`http://localhost:3000/teams/${teamName}`)
        .then(response => {
          if (response.status === 204) {
            throw new Error(`Echipa ${teamName} nu se află în baza de date.`);
          }
          return response.json();
        })
        .then(team => {
          teamList.innerHTML = "";
          const teamItem = createTeamItem(team);
          teamList.appendChild(teamItem);
        })
        .catch(error => {
          teamList.innerHTML = "";
          const errorMessage = document.createElement("p");
          errorMessage.textContent = error.message;
          teamList.appendChild(errorMessage);
          console.error("Eroare la obținerea echipei:", error);
        });
    }
  
    function createTeamItem(team) {
      const teamItem = document.createElement("div");
      teamItem.innerHTML = `<strong>Nume:</strong> ${team.name}<br>
                            <strong>Joc:</strong> ${team.game}<br>
                            <strong>Țară:</strong> ${team.country}<br>
                            <strong>Jucători:</strong> ${team.players.join(", ")}`;
      teamItem.style.marginBottom = "20px";
      return teamItem;
    }


  });
  