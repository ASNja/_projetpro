<template>
    <form @submit.prevent="sauvegarder">
        <div class="form-group">
            <label for="nom">Nom</label>
            <input type="text" class="form-control" id="nom" v-model="nom">

            <label for="prenom">prenom</label>
            <input type="text" class="form-control" id="prenom" v-model="prenom">  

            <label for="age">age</label>
            <input type="text" class="form-control" id="age" v-model="age">     

            <label for="adresse">adresse personnelle complète de l'employé</label>
            <input type="text" class="form-control" id="adresse" v-model="adresse">

            <label for="localisation">localisation du lieu de travail</label>
            <input type="text" class="form-control" id="localisation" v-model="localisation">

            <label for="service">service où travaille l'employé</label>
            <input type="text" class="form-control" id="service" v-model="service">

            <label for="poste">poste</label>
            <input type="text" class="form-control" id="poste" v-model="poste">

            <label for="mail">mail</label>
            <input type="mail" class="form-control" id="mail" v-model="mail"> 

            <label for="telephone">telephone (format 12 34 56 78 90)</label>
            <input type="text" class="form-control" pattern="[0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2} [0-9]{2}" id="telephone" v-model="telephone">         
       
        </div>
        <input type="submit" class="btn btn-block btn-lg btn-success" />
    </form>
</template>

<script>
export default {
    name: 'employeAdd',
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
    methods: {
        sauvegarder: async function() {
            let response = await fetch(`${this.apiURL}/employe`, { headers: this.headers, method: 'POST', body: JSON.stringify({ nom: this.nom, prenom: this.prenom, age: this.age, adresse: this.adresse, localisation: this.localisation, service: this.service, poste: this.poste, mail: this.mail, telephone: this.telephone }) })
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