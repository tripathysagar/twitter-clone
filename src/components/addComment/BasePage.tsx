"use client"
import { useRecoilState } from 'recoil';

import { AddTweetAtom } from '@/recoil/atoms/tweetAtom';
import TweetCard from '../home/TweetCard';


export default function BasePage(){
    const [tweet, setTweet] = useRecoilState(AddTweetAtom);


    return (
    <main>
        <TweetCard tweetInput={tweet} clickable={true} />
    </main>
    )

}