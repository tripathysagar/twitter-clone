"use client"
import { useEffect, useState } from "react";
import { useRecoilState } from 'recoil';

import { TweetAtom } from '@/recoil/atoms/tweetAtoms';
import axios from "axios";

export default function ShowTweet(){

    const [tweets, setTweets] = useRecoilState(TweetAtom);

    async function fetchTweets(){
        try {
            const resp = await axios.get('/api/tweet', {
                headers: {
                    offset: 2
                }
            });
            // Assuming the response contains an array of tweets
            setTweets(resp.data);
          } catch (error) {
            console.error('Error fetching tweets:', error);
          }
    }
    useEffect(()=>{
        fetchTweets()
    },[])

    
    return(
        <ul className="w-full sm:w-10/12 md:w-1/2 gap-2 ">
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>

  <li>List Item 1</li>
  <li>List Item 2</li>
  <li>List Item 3</li>
  <li>List Item 100</li>
</ul>
    )
}