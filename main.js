(() => {
    const cardParent = document.querySelector('.grid');
    const region = document.querySelector('select');
    const toggle = document.querySelector('.hero--section__toggle');
    const usersSearch = document.querySelector('.search-section--search-bar');
    const hero = document.querySelector('.hero');
    const search = usersSearch.firstChild.nextElementSibling;
    console.log(search)
    let isDark = true;

    toggle.addEventListener('click', () => {
        if(isDark) {
            document.documentElement.style.setProperty('--Blue-950', 'hsl(0, 0%, 99%)');
            document.body.style.color = 'hsl(200, 15%, 8%)';
            region.style.setProperty('--Blue-900', 'hsl(0, 0%, 99%)');
            region.style.setProperty('--White', 'hsl(200, 15%, 8%)');
            usersSearch.style.setProperty('--Blue-900', 'hsl(0, 0%, 99%)');
            usersSearch.style.setProperty('--White', 'hsl(200, 15%, 8%)');
            hero.style.setProperty('--Blue-900', 'hsl(0, 0%, 99%)');
            hero.style.setProperty('--White', 'hsl(200, 15%, 8%)');
            hero.style.boxShadow = '1 1 10px hsl(209, 23%, 22%)';
            isDark = false;
        } else {
            document.documentElement.style.setProperty('--Blue-950', 'hsl(207, 26%, 17%)');
            document.body.style.color = 'hsl(0, 100%, 100%)';
            region.style.setProperty('--Blue-900', 'hsl(209, 23%, 22%)');
            region.style.setProperty('--White', 'hsl(0, 0%, 99%)');
            usersSearch.style.setProperty('--Blue-900', 'hsl(209, 23%, 22%)');
            usersSearch.style.setProperty('--White', 'hsl(0, 0%, 99%)');
            hero.style.setProperty('--Blue-900', 'hsl(209, 23%, 22%)');
            hero.style.setProperty('--White', 'hsl(0, 0%, 99%)');
            hero.style.boxShadow = '0 0 10px hsl(200, 15%, 8%)';
            isDark = true;
        }
    })

    const fetchData = async () => {
        try {
            const datas = await fetch('data.json');
            const res = await datas.json();
            

            // Clear the existing content (if any)
            cardParent.innerHTML = '';
            
            res.map(data => {
                renderHtml(data);
                
            });

            region.addEventListener('change', (event) => {filterData(event, res)});
            search.addEventListener('click', (event) => {searchProperty(event, res)});

        } catch (error) {
            document.body.innerHTML = `<p>Error fetching data: ${error.message}</p>`;
        }
    }

    const renderHtml = (data) => {
        const html =
        `
            <div class="grid--child">
                <img src=${data.flags.png} alt="Countries flag" />
                <h2>${data.name}</h2>
                <p>Population: ${data.population}</p>
                <p>Region: ${data.region}</p>
                <p>Capital: ${data.capital}</p>
            </div>
        `;
        cardParent.innerHTML += html;
    }

    const filterData = (event, data) => {
        const usersRegion = event.target.value;
        cardParent.innerHTML = "";

        const filteredData = data.filter(item => {
            return usersRegion === "" || item.region === usersRegion;
        });

        filteredData.forEach(data => renderHtml(data));
    }

    const searchProperty = (event, data) => {
        const usersSearchValue = event.target.nextElementSibling.value;
        cardParent.innerHTML = "";

        const filteredSearch = data.filter(item => {
            return usersSearchValue === "" || item.region === usersSearchValue || item.population === +usersSearchValue || item.capital === usersSearchValue || item.name === usersSearchValue;
        });

        filteredSearch.forEach(data => renderHtml(data));
    }

    fetchData();
})()