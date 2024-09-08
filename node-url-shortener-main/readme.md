# Node.js URL Shortener API
This is a Url shorten service in  backend. The Tech stack used in Node JS  , MOngo Db, Express JS.
   '''   The routes used in this are 
        '''-'/api/register' - applied  Jwt authentication.Just go to the route you wil get the token in response. So here client will get the JWT token.use that in headers to pass the middle wares.
        '''-'/api/short' - applied To shorten the URL.   
        {
        "origUrl":"https://www.youtube.com/watch?v=6kGiElisMFH2exzjBeE_zAHHJOdxg&index=8",
    "shortUrl":"",     
    "expiresInDays":2
}
shortURl parameter is optional. it is when you give yoour custom mask url.



Perfectly implemented the radis-cli for caching.
