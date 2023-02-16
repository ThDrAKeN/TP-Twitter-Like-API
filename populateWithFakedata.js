const { faker } = require("@faker-js/faker");
const axios = require("axios");


const buildFakeTweet = async (x) => {
  for (i = 0; i < x; i++) {
    faketweet.push(faker.datatype.uuid());
  }
}

const pushUserToDb = async (x) => {
  for (i = 0; i < x; i++) {
    await axios.post("http://localhost:692/users/create", {
        name: faker.name.firstName(),
        email: faker.internet.email(),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.statusText);
      });
  }
}

const pushTweetToDb = async (x) => {
  for (i = 0; i < x; i++) {
    await axios
      .post("http://localhost:692/tweet/create",{
        user: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
        comments: {
          user: faker.datatype.uuid(),
          desc: faker.lorem.sentence(),
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.statusText);
      });
  }
}

const pushRetweetToDb = async (x) => {
  for (i = 0; i < x; i++) {
    await axios
      .post("http://localhost:692/retweet/create", {
        user: faker.datatype.uuid(),
        tweet_id: faker.datatype.uuid(),
        content: faker.lorem.sentence(),
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err.response.statusText);
      });
  }
}


const control = async (x) => {
  await pushUserToDb(x);
  await pushTweetToDb(x);
  await pushRetweetToDb(x);
};

control(200);








