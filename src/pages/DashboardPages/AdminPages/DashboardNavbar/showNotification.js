
export const showNotification = ()=>{
    const showNotification = document.getElementById('showNotification')
    showNotification.classList.toggle('-top-[300vh]');
    showNotification.classList.toggle('top-0');
    console.log(showNotification);
    
} 