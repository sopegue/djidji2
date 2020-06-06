export const func = {
    ads: ({ id, use_id, categorie, titre, description, marque, prix, pp, nbvues, added_at, updated_at}) => {
        this.id = id;
        this.use_id= use_id;
        this.categorie= categorie;
        this.titre=titre;
        this.description=description;
        this.marque=marque;
        this.prix=prix;
        this.pp=pp;
        this.nbvues=nbvues;
        this.added_at=added_at;
        this.updated_at=updated_at; 
     },
     user:({ id,Nom,Prenom,Nom_entreprise,password,created_at,updated_at,matricule_entreprise,remembered,modified})=>{
        this.id = id;
        this.Nom = Nom;
        this.Prenom= Prenom
        this.Nom_entreprise=Nom_entreprise;
        this.password=password;
        this.created_at=created_at;
        this.updated_at=updated_at;
        this.matricule_entreprise=matricule_entreprise;
        this.remembered=remembered;
        this.modified=modified;
     }
 }