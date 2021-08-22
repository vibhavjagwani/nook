export const errorMessage = (msg='') => {
    return {
    type:'ERROR',
    payload:msg
    }
}
