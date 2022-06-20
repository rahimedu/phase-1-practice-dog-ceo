console.log('%c HI', 'color: firebrick')
console.log('%c HI', 'color: firebrick')

const imgUrl = 'https://dog.ceo/api/breeds/image/random/4'
const breedUrl = 'https://dog.ceo/api/breeds/list/all'

document.addEventListener('DOMContentLoaded', e => {
    fetch(imgUrl)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data.message)
        data.message.forEach( (image, i) => {
            // for (const image of data.message) {
            const dogImgs = document.querySelector('div#dog-image-container');
            const img = document.createElement('img');
            // img.src = image;
            img.src = data.message[i];
            dogImgs.append(img);
        });
    });
    
    const breedList = document.querySelector('ul#dog-breeds');
    const breedArray = [];
    const breedMenu = document.querySelector('select#breed-dropdown');

    fetch(breedUrl)
    .then(resp => resp.json())
    .then(data => {
        // console.log(data.message);
        const breedCollector = () => {
            for (const primBreed in data.message) {
                if (data.message[primBreed].length == 0) {
                    breedArray.push(primBreed);
                } else {
                    data.message[primBreed].forEach(secBreed => {
                        breedArray.push(secBreed + " " + primBreed);
                    })
                }
            }
        }

        const breedElementer = () => {
            breedArray.forEach((dog) => {
                const li = document.createElement('li');
                if (breedMenu.value[0] === dog[0]) {
                li.textContent = dog;
                breedList.append(li);
                }
                li.addEventListener('click', e => {
                    if (li.className !== 'selected') {
                        li.style.color = 'red' ;
                        li.classList.add('selected');
                    } else {
                        li.style.color = '';
                        li.classList.remove('selected');
                    }
                })
            })
        }

        const filterBreed = () => {
            breedMenu.addEventListener('change', e => {
                breedList.replaceChildren();
                breedArray.filter( f => breedMenu.value[0] === breedArray[0] )
                breedElementer();
            })
        }
        breedCollector();
        breedArray.sort();
        filterBreed();
        breedElementer();
    })
})
