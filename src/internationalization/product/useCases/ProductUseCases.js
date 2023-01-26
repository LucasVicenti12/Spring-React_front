import Swal from "sweetalert2"
import { productRepository } from "../repositories/ProductRepository"

class ProductUseCases {
    toast = Swal.mixin({
        toast: true,
        icon: 'success',
        title: 'General Title',
        animation: false,
        position: 'top-right',
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })
    
    async registerProduct(product) {        
        const response = await productRepository.registerProduct(product)            
        if(response){
            if(response.response){
                if(response.response.status === 400){
                    return Swal.fire({
                        title: 'Erros',
                        icon: 'error',
                        text: response.response.data.response
                    })
                }            
            }
            if(response.status > 200){
                return this.toast.fire({
                    animation: true,
                    title: 'Success!'
                })
            }
        }
    }
}

export const productUseCases = new ProductUseCases()