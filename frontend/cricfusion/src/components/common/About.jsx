import React from 'react'
import '../../assets/about.css'
import { ImOffice } from 'react-icons/im'
import image from '../../assets/cricket.png'
import { UserHeader } from '../user/UserHeader'
import { UserFooter } from '../user/UserFooter'

export const About = () => {
  return (
    <>
      <meta charSet="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>About CricAuction</title>
      <UserHeader/>
      <div className="hero-section">
        <div className="container1">
          <div className="content-box">
            <h1 className="title">
              <span className="title-about">About</span>
              <span className="title-name">CricAuction<span className="trademark">™</span></span>
            </h1>
            <p className="description">
              Each tournament coordinator knows that it is so difficult to figure
              out piles of entry forms, make the draws out of it and matches to have
              an incredible tournament. Super Player Auction is intended to deal
              with a competition and gives you useful, and proficient abilities.
              Super Player Auction offers loads of functionalities with unmatched
              exactness and proficiency. Super Player Auction is made for all type
              of sports.
            </p>
            <button className="btn-register">
              Register Now
              <span className="arrow-icon">→</span>
            </button>
          </div>
          <div className="cricket-illustration">
            <img
              src={image}
              alt="CricAuction Illustration"
              className="player-illustration"
            />
          </div>
        </div>
      </div>
      <UserFooter/>
    </>
  )
}