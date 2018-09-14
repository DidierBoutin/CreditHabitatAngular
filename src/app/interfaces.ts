
export interface Anomalie {
    codeSoc: string;
    codePTT: string;
    codeMat: string;
    numTrim: number;
    anTrim: number;
    nbDoss: number;
    mtAno: number;
    codeDev: string;
}

export interface AnomalieNg2Smart {
    societe: string;
    departement: string;
    trimestre: number;
    annee: number;
    materiel: string;
    nbdossiers: number;
    montant: number;
 }


export interface Declarer {
    codeSoc: string;
    codePTT: string;
    codeMat: string;
    numTrimDec: number;
    anTrimDec: number;
    nbDossDec: number;
    mtDec: number;
    codeUtil: string;
    dateValid: Date;
    dateDec: Date;
    codeDev: string;
}

export interface Donnees {
    codeSoc: string;
    codePTT: string;
    codeMat: string;
    numTriTra: number;
    anTrimTra: number;
    nbDoss: number;
    mt: number;
    dateValid: Date;
    codeDev: string;
}


export interface Materiel {
        codeMat: string;
        libRegMat: string;
        libCodeMat: string;
}

export interface Societe {
    codeSoc: string;
    codeEtabl: string;
    valider: number;
}

export interface Departement {
    codePTT: string;
    nomDepart: string;
 }

 export interface Regroupm {
    codeRegroupMat: string;
    libRegroupMat: string;
 }

 export interface Totprod {
    codeSoc: string;
    numTrimDec: number;
    anTrimDec: number;
    totProd: number;
    codeDev: string;
 }


 export interface BoxEditNg2 {
    title: string;
    value: string;
 }

//  export interface AvaliderBoxRow {
//     codeSoc: string;
//     anTrim: number;
//     numTrim: number;
//     tot: number;
//  }

 export interface AvaliderBoxRow {
    societe: string;
    annee: number;
    trimestre: number;
    total: number;
 }
