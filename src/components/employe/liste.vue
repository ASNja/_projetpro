<template>
  <div>
      Liste des employés<br>
      <button class="btn btn-lg btn-success float-right" @click="$router.push({name: 'AddEmploye'})">Ajouter un employé</button>
      <button class="btn btn-lg btn-info float-right" @click="$router.push({name: 'ListeConge'})">Consulter tous les congés</button>
      <br><br><br>
      <table class="table">
          <thead>
              <tr>
                  <th>&nbsp; id</th>
                  <th>nom</th>
                  <th>prenom</th>
                  <th>localisation</th>
                  <th>service</th>
                  <th>poste</th>
                  <th>debut congés</th>
                  <th>fin congés</th>
                  <th>editer</th>
                  <th>supprimer</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="employe in employes" :key="employe.id">
                  <td><button class="btn btn-xs btn-warning" @click="$router.push({name: 'DetailsEmploye', params: {id: employe.id}})">{{ employe.id }}</button></td>
                  <td>{{ employe.nom }}</td>
                  <td>{{ employe.prenom }}</td>
                  <td>{{ employe.localisation }}</td>
                  <td>{{ employe.service }}</td>
                  <td>{{ employe.poste }}</td>
                  <td>{{ employe.debut }}</td>
                  <td>{{ employe.fin }}</td>
                  <td><button class="btn btn-sm btn-success" @click="$router.push({name: 'EditEmploye', params: {id: employe.id}})">Editer</button></td>
                  <td><button class="btn btn-sm btn-danger" @click="supprimer(employe.id)">Supprimer</button></td>
              </tr>
          </tbody>
      </table>
  </div>
</template>

<script>
export default {
    name: 'employeListe',
    data: function() {
        return {
            employes: null,
            apiURL: 'http://localhost:3000',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            result: null
        }
    },
    mounted() {
        this.getEmployes()
    },
    methods: {
        getEmployes: async function() {
            let response = await fetch(`${this.apiURL}/employes`)
            this.employes = await response.json()
        },
        supprimer: async function(id) {
            if(confirm("Voulez vous vraiment supprimer cet employé ?")) {
                let response = await fetch(`${this.apiURL}/employe/${id}`, { headers: this.headers, method: 'DELETE' })
                this.result = await response.json()
                if (this.result.affectedRows == 1) {
                    this.getEmployes()
                }
            }
        }
    }
}
</script>