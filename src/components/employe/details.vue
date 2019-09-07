<template>
    <form @submit.prevent="sauvegarder">
        <br>
        <div class="p-3 mb-2 bg-primary text-white">Informations de l'employé</div>
        <!--  Bouton renvoie actuellement a l'accueil et pas à la version éditable de la page employé-->
        <td><button class="btn btn-sm btn-success" @click="$router.push({name: 'EditEmploye', params: {id: employe.id}})">Editer les informations de cet employé</button></td>
        <br>
        <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" v-model="nom" disabled>

            <label for="prenom">Prenom</label>
            <input type="text" class="form-control" id="prenom" v-model="prenom" disabled>  

            <label for="age">Date de naissance</label>
            <input type="text" class="form-control" id="age" v-model="age" disabled>     

            <label for="adresse">Adresse personnelle complète de l'employé</label>
            <input type="text" class="form-control" id="adresse" v-model="adresse" disabled>

            <label for="localisation">Localisation du lieu de travail</label>
            <input type="text" class="form-control" id="localisation" v-model="localisation" disabled>

            <label for="service">Service où travaille l'employé</label>
            <input type="text" class="form-control" id="service" v-model="service" disabled>

            <label for="poste">Poste</label>
            <input type="text" class="form-control" id="poste" v-model="poste" disabled>

            <label for="mail">Mail</label>
            <input type="mail" class="form-control" id="mail" v-model="mail" disabled> 

            <label for="telephone">N° de telephone (format 12 34 56 78 90)</label>
            <input type="text" class="form-control" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" id="telephone" v-model="telephone" disabled>         
       
        </div>
        <br>
        <div class="p-3 mb-2 bg-info text-white">Congés de l'employé</div>
        <table class="table">
          <thead>
              <tr>
                  <th>debut congés</th>
                  <th>fin congés</th>
                  <th>editer</th>
                  <th>supprimer</th>
              </tr>
          </thead>
          <tbody>
              <tr v-for="employe in employes" :key="employe.id">
                  <td>{{ employe.debut }}</td>
                  <td>{{ employe.fin }}</td>
                  <td><button class="btn btn-sm btn-success" @click="$router.push({name: 'EditEmploye', params: {id: employe.id}})">Editer</button></td>
                  <td><button class="btn btn-sm btn-danger" @click="supprimer(employe.id)">Supprimer</button></td>
              </tr>
          </tbody>
          </table>
    </form>
</template>

<script>
export default {
    name: 'employeEdit',
    props: {
        id: String
    },
    data: function() {
        return {
            nom: '',
            prenom: '',
            age: '',
            adresse: '',
            localisation: '',
            service: '',
            poste: '',
            mail: '',
            telephone: '',
            apiURL: 'http://localhost:3000',
            headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
            result: null
        }
    },

    mounted() {
        this.getEmploye()
    },
  watch: {
    '$route': function() {
       this.getEmploye()
    }
  },
    methods: {
        getEmploye: async function() {
            let response = await fetch(`${this.apiURL}/employe/${this.id}`)
            let employe = await response.json()
            this.nom = employe[0].nom
            this.prenom = employe[0].prenom
            this.age = employe[0].age
            this.adresse = employe[0].adresse
            this.localisation = employe[0].localisation
            this.service = employe[0].service
            this.poste = employe[0].poste
            this.mail = employe[0].mail
            this.telephone = employe[0].telephone

        },
        sauvegarder: async function() {
            let response = await fetch(`${this.apiURL}/employe/${this.id}`, { headers: this.headers, method: 'PUT', body: JSON.stringify({ nom: this.nom, prenom: this.prenom, age: this.age, adresse: this.adresse, localisation: this.localisation, service: this.service, poste: this.poste, mail: this.mail, telephone: this.telephone }) })
            this.result = await response.json()
            if (this.result.affectedRows == 1) {
                this.$router.push({name: 'Accueil'})
            }
        }
    }
}
</script>

<style>

</style>