
import VideoCard from '../VideoCard/VideoCard'
import {Container} from '@material-ui/core';
import {useState, useEffect} from 'react';

function VideoContainer(props) {
    const search = require('../api/search/search')
    const [results, setResults] = useState(0);
    var output = [];

    //Instantiate output on new api
    useEffect(() => {
        console.log("Updating on new...")
        if (results.items !== undefined) {
            for(let idx = 0; idx < results.items.length; idx++) {
                console.log("Creating card...");
                console.dir(results.items[idx]);
                if (results.items[idx].snippet !== undefined) {
                    output.push(<VideoCard data = {results.items[idx]} key = {results.items[idx].id.videoId} />)
                }
            }
        }
    })
    console.dir(props)
    if (results.items === undefined) {
        const results = search.getSearchResults("", props.id);
        setResults(results);
        let tresults = {
            "kind": "youtube#searchListResponse",
            "etag": "xlUJoefbmn6Og-59Q-ZwUvE8Wo4",
            "nextPageToken": "CAUQAA",
            "regionCode": "US",
            "pageInfo": {
                "totalResults": 133,
                "resultsPerPage": 5
            },
            "items": [
                {
                    "kind": "youtube#searchResult",
                    "etag": "em515EAG9x3l3Dyy-x217nP15dA",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "2nghPJKVVaE"
                    },
                    "snippet": {
                        "publishedAt": "2021-05-05T21:16:05Z",
                        "channelId": "UCQSEAbOs6vsJfy7WN7iYaGQ",
                        "title": "So I decided to speedrun Swords and Sandals and created a beautiful mess of blood",
                        "description": "Swords and Sandals is one of the best flash games of all time. You get to fight a bunch of gladiators to the death, and what's better than that? Speedrunning Sword and Sandals, on the other hand, is kind of a mess full of blood and RNG.\n\nWatch live at: http://twitch.tv/EazySpeezy\n\n▶ Twitter: https://twitter.com/EazySpeezy\n▶ Instagram: https://instagram.com/EazySpeezy/\n▶ Merch: https://teespring.com/stores/EazySpeezy\n\nEdited by: @The Suited Bird \nWatch the world record run here: https://youtu.be/nTC7PpyXx1s\n\nMy channel generally focuses on a more casual side of speedruns. With these videos I want to show off cool speedruns, explain how they work, and entertain. Hopefully you enjoy the content and maybe even take up speedrunning yourself, because it is truly a lot of fun!\n\n#EazySpeezy #SwordsAndSandals #Speedrun",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/2nghPJKVVaE/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/2nghPJKVVaE/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/2nghPJKVVaE/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            },
                            "standard": {
                                "url": "https://i.ytimg.com/vi/2nghPJKVVaE/sddefault.jpg",
                                "width": 640,
                                "height": 480
                            },
                            "maxres": {
                                "url": "https://i.ytimg.com/vi/2nghPJKVVaE/maxresdefault.jpg",
                                "width": 1280,
                                "height": 720
                            }
                        },
                        "channelTitle": "EazySpeezy",
                        "liveBroadcastContent": "none",
                        "publishTime": "2021-05-05T21:16:05Z"
                    }
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "uMzTA-C5IDCIxps0Ww7Qr6ahHXQ",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "wm1NyyHjh-A"
                    },
                    "snippet": {
                        "publishedAt": "2021-05-12T15:02:21Z",
                        "channelId": "UCQSEAbOs6vsJfy7WN7iYaGQ",
                        "title": "Speedrunning Plants vs Zombies is More Intense Than You Think",
                        "description": "Plants vs Zombies is a timeless masterpiece. I mean you get to fight zombies with plants so that's pretty cool. However, the speedrun can get just a bit... nerve-wracking\n\nWatch live at: http://twitch.tv/EazySpeezy\n\n▶ Twitter: https://twitter.com/EazySpeezy\n▶ Instagram: https://instagram.com/EazySpeezy/\n▶ Merch: https://teespring.com/stores/EazySpeezy\n\nEdited by: @The Suited Bird \nWatch the world record run here: https://youtu.be/VW3CDH7eRwc\n\nMy channel generally focuses on a more casual side of speedruns. With these videos I want to show off cool speedruns, explain how they work, and entertain. Hopefully you enjoy the content and maybe even take up speedrunning yourself, because it is truly a lot of fun!\n\n#EazySpeezy #PlantsVsZombies #Speedrun",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/wm1NyyHjh-A/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/wm1NyyHjh-A/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/wm1NyyHjh-A/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            },
                            "standard": {
                                "url": "https://i.ytimg.com/vi/wm1NyyHjh-A/sddefault.jpg",
                                "width": 640,
                                "height": 480
                            },
                            "maxres": {
                                "url": "https://i.ytimg.com/vi/wm1NyyHjh-A/maxresdefault.jpg",
                                "width": 1280,
                                "height": 720
                            }
                        },
                        "channelTitle": "EazySpeezy",
                        "liveBroadcastContent": "none",
                        "publishTime": "2021-05-12T15:02:21Z"
                    }
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "AnxOrqEBuWutOqGMk1D7GImV0Vg",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "94uj951nroI"
                    },
                    "snippet": {
                        "publishedAt": "2021-05-10T21:08:17Z",
                        "channelId": "UCQSEAbOs6vsJfy7WN7iYaGQ",
                        "title": "So Crossy Road speedruns exist...",
                        "description": "Crossy Road might be one of the greatest speedruns in the world... okay that's probably going a bit to far. But at least it's pretty fun!\n\nWatch live at: http://twitch.tv/EazySpeezy\n\n▶ Twitter: https://twitter.com/EazySpeezy\n▶ Instagram: https://instagram.com/EazySpeezy/\n▶ Merch: https://teespring.com/stores/EazySpeezy\n\nWatch the world record speedrun here: https://youtu.be/9S8qm9M1w-E\n\nMy channel generally focuses on a more casual side of speedruns. With these videos I want to show off cool speedruns, explain how they work, and entertain. Hopefully you enjoy the content and maybe even take up speedrunning yourself, because it is truly a lot of fun!\n\n#EazySpeezy #CrossyRoad #Speedrun",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/94uj951nroI/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/94uj951nroI/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/94uj951nroI/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            },
                            "standard": {
                                "url": "https://i.ytimg.com/vi/94uj951nroI/sddefault.jpg",
                                "width": 640,
                                "height": 480
                            },
                            "maxres": {
                                "url": "https://i.ytimg.com/vi/94uj951nroI/maxresdefault.jpg",
                                "width": 1280,
                                "height": 720
                            }
                        },
                        "channelTitle": "EazySpeezy",
                        "liveBroadcastContent": "none",
                        "publishTime": "2021-05-10T21:08:17Z"
                    }
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "ZkeJL9SSDmRcGvCTHUSn2QDxslg",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "nFG1sGlEuBk"
                    },
                    "snippet": {
                        "publishedAt": "2021-05-01T19:59:05Z",
                        "channelId": "UCQSEAbOs6vsJfy7WN7iYaGQ",
                        "title": "I tried speedrunning Hill Climb Racing and experienced the struggle of keeping your neck intact",
                        "description": "Hill Climb Racing is one of my favorite mobile games from my childhood. You get to slowly increase your abilities, while trying not to break your neck every 2 minutes. Now when you come to speedrunning it, that's when it truly gets interesting.\n\nWatch live at: http://twitch.tv/EazySpeezy\n\n▶ Twitter: https://twitter.com/EazySpeezy\n▶ Instagram: https://instagram.com/EazySpeezy/\n▶ Merch: https://teespring.com/stores/EazySpeezy\n\nWatch the world record speedrun here: https://youtu.be/EvEFoPq1xxs\n\nMy channel generally focuses on a more casual side of speedruns. With these videos I want to show off cool speedruns, explain how they work, and entertain. Hopefully you enjoy the content and maybe even take up speedrunning yourself, because it is truly a lot of fun!\n\n#EazySpeezy #HillClimbRacing #Speedrun",
                        "thumbnails": {
                            "default": {
                                "url": "https://i.ytimg.com/vi/nFG1sGlEuBk/default.jpg",
                                "width": 120,
                                "height": 90
                            },
                            "medium": {
                                "url": "https://i.ytimg.com/vi/nFG1sGlEuBk/mqdefault.jpg",
                                "width": 320,
                                "height": 180
                            },
                            "high": {
                                "url": "https://i.ytimg.com/vi/nFG1sGlEuBk/hqdefault.jpg",
                                "width": 480,
                                "height": 360
                            },
                            "standard": {
                                "url": "https://i.ytimg.com/vi/nFG1sGlEuBk/sddefault.jpg",
                                "width": 640,
                                "height": 480
                            },
                            "maxres": {
                                "url": "https://i.ytimg.com/vi/nFG1sGlEuBk/maxresdefault.jpg",
                                "width": 1280,
                                "height": 720
                            }
                        },
                        "channelTitle": "EazySpeezy",
                        "liveBroadcastContent": "none",
                        "publishTime": "2021-05-01T19:59:05Z"
                    }
                },
                {
                    "kind": "youtube#searchResult",
                    "etag": "luZIyyGLyhLR1mYPuP1QwyoGyKM",
                    "id": {
                        "kind": "youtube#video",
                        "videoId": "UfpkpU2h85k"
                    }
                }
            ]
        }


    } 
    return(<Container fixed style={{backgroundColor: "lightGray", height: '100vh', padding:'10px'}}>{output}</Container>)
    
}
export default VideoContainer;