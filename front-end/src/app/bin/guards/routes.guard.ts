import { inject } from "@angular/core";
import { Router } from "@angular/router";

export const guard = () => {

    const router = inject(Router)

    if(localStorage.getItem('uu0x0') || sessionStorage.getItem('uu0x0')){
        return true;
    }
    else{
        router.navigate(['/'])
        return false;
    }
}