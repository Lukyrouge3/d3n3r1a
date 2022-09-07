// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {addDoc, collection, getFirestore, getDocs, getDoc, doc, setDoc } from "firebase/firestore";
import config from "../config";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBm9PgSfRp4corLU_xlbU-G7nqFWrmqchs",
    authDomain: "d3n3r1a.firebaseapp.com",
    projectId: "d3n3r1a",
    storageBucket: "d3n3r1a.appspot.com",
    messagingSenderId: "364475601097",
    appId: "1:364475601097:web:40aacbf1a913d72a6afd18"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export async function addCommand(command: string, guild: string, user: string, args: string | null = null) {
    const res = await addDoc(collection(db, "commands"), {
        command,
        guild,
        user,
        args,
        time: new Date()
    });
}

async function createWallet(user: string) {
    await setBalance(user, config.DEFAULT_MONEY);
}

export async function getBalance(user: string) {
    const query = await getDoc(doc(db, "wallets", user));
    if (query.exists()) {
        return roundNumber(query.data().balance);
    } else {
        createWallet(user);
        return config.DEFAULT_MONEY;
    }
}

export async function setBalance(user: string, amount: number) {
    await setDoc(doc(db, "wallets", user), {balance: amount});
}

export async function addBalance(user: string, amount: number) {
    const balance = await getBalance(user);
    await setBalance(user, balance + amount);
}

export async function pay(user: string, target: string, amount: number) {
    addBalance(user, - amount);
    addBalance(target, amount);
    return await addDoc(collection(db, "transactions"), {
        user,
        target,
        amount,
        time: new Date()
    });
}

export async function adminPay(target: string, amount: number) {
    return await pay("ADMIN", target, amount);
}

export async function getMemberCommands(user: string, limit: number, command: string | undefined = undefined) {
    const query = await getDocs(collection(db, "commands"));
    return query.docs.filter(doc => doc.data().user == user && (command ? doc.data().command == command : true)).slice(0, limit);
}

// Round the number to 2 decimals
export function roundNumber(number: number) {
    return Math.round(number * 100) / 100;
}

export async function paycheck(user: string) {
    const res = await adminPay(user, config.DEFAULT_PAYCHECK);
    await addDoc(collection(db, "paydays"), {
        user,
        time: new Date(),
        transaction: res.id
    });
}

export async function getLastPayday(user: string) {
    const query = await getDocs(collection(db, "paydays"));
    return query.docs.filter(doc => doc.data().user == user).slice(0, 1);
}