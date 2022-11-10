import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {useQuery, useQueryClient} from 'react-query';
import {
  ActivityIndicator,
  Dimensions,
  FlatList,
  RefreshControl,
  View,
  Text,
  useColorScheme,
} from 'react-native';
import HList from '../components/HList';
import Loader from '../components/Loader';
import Swiper from 'react-native-web-swiper';
import Slide from '../components/Slide';
import HMedia from '../components/HMedia';
import VMedia from '../components/VMedia';
import styled from 'styled-components/native';
import {MovieResponse, moviesApi} from '../api';
import {makeImgPath} from '../util';
const API_KEY = 'fb2c84dd28cdf4cc320c4b6ed588d26e';

const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  justify-content: center;
  align-items: center;
`;
const Column = styled.View`
  width: 40%;
  marigin-left: 15px;
`;
const VSeparator = styled.View`
  width: 20px;
`;
const HSeparator = styled.View`
  height: 20px;
`;

const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;

const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;

const {height: SCREEN_HEIGHT} = Dimensions.get('window');
// const SCREEN_HEIGHT = Dimensions.get('window').height;
const Movies: React.FC<NativeStackScreenProps<any, 'Movies'>> = () => {
  const queryClient = useQueryClient();
  // const {
  //   isLoading: nowPlayingLoading,
  //   data: nowPlayingData,
  //   isRefetching: isRefetchingNowPlaying,
  // } = useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
  // const {
  //   isLoading: upcomingLoading,
  //   data: upcomingData,
  //   isRefetching: isRefetchingUpcoming,
  // } = useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming);
  // const {
  //   isLoading: trendingLoading,
  //   data: trendingData,
  //   isRefetching: isRefetchingTrending,
  // } = useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);
  const [refreshing, setRefreshing] = useState(false);
  const {isLoading: nowPlayingLoading, data: nowPlayingData} =
    useQuery<MovieResponse>(['movies', 'nowPlaying'], moviesApi.nowPlaying);
  const {isLoading: upcomingLoading, data: upcomingData} =
    useQuery<MovieResponse>(['movies', 'upcoming'], moviesApi.upcoming);
  const {isLoading: trendingLoading, data: trendingData} =
    useQuery<MovieResponse>(['movies', 'trending'], moviesApi.trending);
  const onRefresh = async () => {
    setRefreshing(true);
    await queryClient.refetchQueries(['movies']);
    setRefreshing(false);
  };
  const renderVMedia = ({item}) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({item}) => (
    <HMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const movieKeyExtractor = item => item.id + '';
  const loading = nowPlayingLoading || upcomingLoading || trendingLoading;
  return loading ? (
    <Loader />
  ) : upcomingData ? (
    <FlatList
      onRefresh={onRefresh}
      refreshing={refreshing}
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            containerStyle={{
              marginBottom: 40,
              width: '100%',
              height: SCREEN_HEIGHT / 4,
            }}>
            {nowPlayingData?.results.map(movie => (
              <Slide
                key={movie.id}
                backdropPath={movie.backdrop_path || ''}
                posterPath={movie.poster_path || ''}
                originalTitle={movie.original_title}
                voteAverage={movie.vote_average}
                overview={movie.overview}
              />
            ))}
          </Swiper>
          {trendingData ? (
            <HList title="Trending Movies" data={trendingData.results} />
          ) : null}
          <ComingSoonTitle>Coming soon</ComingSoonTitle>
        </>
      }
      data={upcomingData.results}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeparator}
      renderItem={({item}) => (
        <HMedia
          posterPath={item.poster_path || ''}
          originalTitle={item.original_title}
          overview={item.overview}
          releaseDate={item.release_date}
        />
      )}
    />
  ) : null;
};

export default Movies;
