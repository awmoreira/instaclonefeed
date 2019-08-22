import React, {useState, useEffect} from 'react';
import {Animated} from 'react-native';

import {Small, Original} from './styles';

const AnimatedOriginal = Animated.createAnimatedComponent(Original);

export default function LazyImage({
  smallSource,
  source,
  aspectRatio,
  shouldLoad,
}) {
  const [loaded, setLoaded] = useState(false);
  const opacity = new Animated.Value(0);

  useEffect(() => {
    if (shouldLoad) {
      setInterval(() => {
        setLoaded(true);
      }, 1000);
    }
  }, [shouldLoad]);

  function handleAnimate() {
    Animated.timing(opacity, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }

  return (
    <Small
      source={smallSource}
      ratio={aspectRatio}
      resizeModa="contain"
      blurRadius={2}>
      {loaded && (
        <AnimatedOriginal
          style={{opacity}}
          source={source}
          ratio={aspectRatio}
          resizeMode="contain"
          onLoadEnd={handleAnimate}
        />
      )}
    </Small>
  );
}
