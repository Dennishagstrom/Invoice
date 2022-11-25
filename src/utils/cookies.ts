/*
 * General utils for managing cookies in Typescript.
 */
import {Token} from "../types/token";

export async function setCookie(name: string, val: string, token: Token) {
    const date = new Date();
    const value = val;

    // Set it expire in 7 days
    date.setTime(date.getTime() + (7 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=" + value + "; expires=" + date.toUTCString() + "; path=/";
}

export async function getCookie(name: string) {
    const value: any = "; " + document.cookie;
    const parts: any = value.split("; " + name + "=");

    if (parts.length == 2) {
        return parts.pop().split(";").shift();
    }
}

export function deleteCookie(name: string) {
    const date = new Date();

    // Set it expire in -1 days
    date.setTime(date.getTime() + (-1 * 24 * 60 * 60 * 1000));

    // Set it
    document.cookie = name + "=; expires=" + date.toUTCString() + "; path=/";
}