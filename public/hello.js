const qoute = document.querySelector('#qoute');
const qouteBtn = document.querySelector('#qoute-btn');

const randNum = (num) => {
    return Math.floor((Math.random() * num));
}

const getQoute=  () => {
    axios.get('/api/qoutes').then((res) => {
        const index = randNum(res.data.length);
        qoute.textContent = res.data[index].qoute
    })
}

qouteBtn.addEventListener('click', getQoute);