import {test, expect} from '@playwright/test';


test.describe('Automation of API end points', ()=> {

    let usertoken : string;
    let userid : string;
    let noteid : string;

test('automate user login api endpoint', async({request}) => {

   const loginres = await request.post('https://practice.expandtesting.com/notes/api/users/login', {
  data:{
            email: 'practicetest123@aol.com',
            password: 'test123'
        }

    });
    expect(loginres.status()).toBe(200);
    const loginresbody = await loginres.json();
       console.log('res:', loginresbody); 
       userid = loginresbody.data.id;
       usertoken = loginresbody.data.token;    
       console.log(usertoken, userid);
       const loginresheader = await loginres.headersArray();
       console.log(loginresheader);

});



test('automate get user profile via api endpoint', async({request}) =>{

    const profileres= await request.get("https://practice.expandtesting.com/notes/api/users/profile", {

headers: {

    "x-auth-token": usertoken
}
    });
    expect(profileres.status()).toBe(200);
    const profileresbody = await profileres.json();
    console.log(profileresbody);
    expect(profileresbody).toHaveProperty("data");
    expect(profileresbody.data.name).toEqual('tester123');
});

test('create a new note via api endpoint', async({request}) => {

    const noteres = await request.post('https://practice.expandtesting.com/notes/api/notes', {

        data:{

            title:'api automation',
            description:'creating note via api automation',
            category:'Personal'
        },
        headers:{

            "x-auth-token": usertoken,
            "accept": 'application/json'
        }
    }); 
    expect(noteres.status()).toBe(200);
    const noteresponsebody = await noteres.json();
    console.log(noteresponsebody);
    expect(noteresponsebody).toHaveProperty('data');
    expect(noteresponsebody.data).toHaveProperty('title', 'api automation');
    noteid = noteresponsebody.data.id;
    console.log(`note id is: ${noteid}`);

});

test('get note by id', async({request}) => {

    const getnoteres = await request.get(`https://practice.expandtesting.com/notes/api/notes/${noteid}`, {

        headers:{

            "accept": 'application/json',
            "x-auth-token": usertoken

        }

    });
    expect(getnoteres.status()).toBe(200);
    const getnoteresbody = await getnoteres.json();
    console.log(getnoteresbody);
    expect(getnoteresbody).toHaveProperty('data');    
    expect(getnoteresbody.data).toHaveProperty('id', noteid);
    expect(getnoteresbody.data).toHaveProperty('title', 'api automation');
    expect(getnoteresbody.data).toHaveProperty('description', 'creating note via api automation');

    });




});

