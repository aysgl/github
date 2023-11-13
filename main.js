const API_URL = "https://api.github.com/users/";
const form = document.querySelector("form");
const search = document.querySelector(".search input");
const userlist = document.querySelector(".userlist");

async function getUser(username) {
    try {
        const response = await axios.get(API_URL + username);
        const data = response.data;
        console.log(data)
        let html = ""
        html = `
        <div class="user">
            <div class="user-img">
                <img src="${data.avatar_url}" alt="">
            </div>
            <div class="user-info">
                <p>${data.name} <span>${data.login}</span></p>
                <p>${data.bio}</p>
                <small>
                    ${data.location}
                    <span>.</span>
                    <i class="fa-solid fa-book"></i> ${data.public_repos}
                    <span>.</span>
                    <i class="fa-regular fa-user"></i>
                    ${data.followers}
                </small>
            </div>
            <div class="user-action">
                <div class="btn">Follow</div>
            </div>
        </div>`
        userlist.innerHTML = html
    } catch (error) {
        console.error(error);
    }
}

form.addEventListener("submit", async (e) => {
    e.preventDefault();
    const username = search.value;
    if (username) {
        await getUser(username);
        search.value = "";
    }
});
