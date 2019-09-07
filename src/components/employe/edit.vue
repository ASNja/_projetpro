<template>
    <form @submit.prevent="sauvegarder">
        <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" v-model="nom">

            <label for="prenom">Prenom</label>
            <input type="text" class="form-control" id="prenom" v-model="prenom">  

            <label for="age">Date de naissance</label>
            <input type="text" class="form-control" id="age" v-model="age">     

            <label for="adresse">Adresse personnelle complète de l'employé</label>
            <input type="text" class="form-control" id="adresse" v-model="adresse">

            <label for="localisation">Localisation du lieu de travail</label>
            <input type="text" class="form-control" id="localisation" v-model="localisation">

            <label for="service">Service où travaille l'employé</label>
            <input type="text" class="form-control" id="service" v-model="service">

            <label for="poste">Poste</label>
            <input type="text" class="form-control" id="poste" v-model="poste">

            <label for="mail">Mail</label>
            <input type="mail" class="form-control" id="mail" v-model="mail"> 

            <label for="telephone">N° de telephone (format 12 34 56 78 90)</label>
            <input type="text" class="form-control" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" id="telephone" v-model="telephone">         
       
        </div>
        <input type="submit" class="btn btn-block btn-lg btn-success" />
        <br>
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