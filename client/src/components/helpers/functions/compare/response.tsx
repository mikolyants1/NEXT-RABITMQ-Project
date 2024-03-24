export function response(id:string,isHome:boolean):boolean{
    return isHome ? id == '-1' : id !== '-1';
};