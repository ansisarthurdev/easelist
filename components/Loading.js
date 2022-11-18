import React from 'react'
import styled from 'styled-components'

import LottieView from 'lottie-react-native'

const Loading = () => {
  return (
    <Wrapper>
      <LottieView source={require('../assets/loading.json')} autoPlay loop style={{width: '100%', height: '100%'}}/>
    </Wrapper>
  )
}

const Text = styled.Text`
font-size: 18px;
font-weight: bold;
margin-top: 5px;
`

const Wrapper = styled.View`
flex: 1;
justify-content: center;
align-items: center;
background-color: transparent;
`

export default Loading