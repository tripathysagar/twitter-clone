import { prisma } from "./prismaInit";



export async function fetchTweets(userId:number,offset:number){
    const tweets = await prisma.tweet.findMany({
        orderBy:{
              createdAt: 'desc',
            },
        skip: offset * 25,
        take: 25, 
        include : {
            author: {
                select: {
                    name: true,
                    avatar: true,
                    email: true,
                }
            },
            likes: {
                where: {
                    authorId: userId, // Fill in the userId to filter likes by a specific user
                },
                select: {
                    id: true
                }
            }
        }
    })
    //console.log("+++++++++++++++++++++")
    //console.log(tweets);
    
    const flattenedTweets = tweets.map(tweet => ({
        id: tweet.id,
        tweet: tweet.tweet,
        createdAt: tweet.createdAt,
        avatar: tweet.author.avatar,
        authorName: tweet.author.name,
        authorEmail: tweet.author.email,
        authorId: tweet.authorId,
        likesCount: tweet.likesCount,
        commentsCount: tweet.commentsCount,
        userLiked: tweet.likes[0] === undefined ? false : true
    }));

    return flattenedTweets;
}