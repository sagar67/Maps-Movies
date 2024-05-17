import React, {useEffect, useState} from 'react';
import {
  View,
  Image,
  Text,
  Pressable,
  FlatList,
  StyleSheet,
  Linking,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Spinner} from './Spinner';

function MoviesList({movies}) {
  const [movieData, setMovieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setLoading(true);
    fetch('https://dummyapi.online/api/movies')
      .then(response => {
        return response.json();
      })
      .then(data => {
        setMovieData(data);
        setLoading(false);
      });
  }, []);

  function MovieDetailHandler(movieId) {
    // navigation.navigate('MovieDetail', {
    //   movieId: movieId,
    // });
    Linking.openURL(movieId);
  }

  const renderList = ({item}) => (
    <Pressable
      onPress={() => MovieDetailHandler(item.imdb_url)}
      style={({pressed}) => [pressed && styles.pressed]}>
      <View style={styles.rootContainer}>
        {/* <Image style={styles.imageContainer} source={{ uri: item?.image }} /> */}
        <Text style={styles.description}>{item.movie}</Text>
      </View>
    </Pressable>
  );

  return (
    <View style={styles.moviesContainer}>
      <Spinner loading={loading} />
      {movieData.length !== 0 && (
        <FlatList
          data={movieData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderList}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  moviesContainer: {
    flex: 1,
    justifyContent: 'center',
    borderWidth: 1,
    borderRadius: 3,
    margin: 10,
    padding: 8,
    backgroundColor: '#BAB8B6',
    borderRadius:10,
    borderColor:'#DAD4D8'
  },
  rootContainer: {
    flex: 1,
    padding: 8,
  },
  imageContainer: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    margin: 8,
  },
  description: {
    fontSize: 16,
    textAlign: 'justify',
    // backgroundColor: '#BAB8B6',
    borderRadius: 5,
    padding: 7,
  },
  pressed: {
    opacity: 0.5,
  },
});

export default MoviesList;
