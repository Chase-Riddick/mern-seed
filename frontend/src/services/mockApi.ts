// src/services/mockApi.ts  
import { EpisodeMetadata, EpisodeData } from "../features/phraseGame/types";  

// Fetch all episodes (metadata only) 
  const mockEpisodes: EpisodeMetadata[] = [
    {
      _id: "",
      episodeId: "005",
      title: "Hide And Seek",
      description: "Peppa and her friends enjoy a fun day in the puddles.",
      series: "Peppa Pig",
      releaseDate: "2025-01-15T00:00:00Z",
      contentItems: {
        image: {
          url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/image/005_hide_and_seek_cover.jpg",
          s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/image/005_hide_and_seek_cover.jpg"
        },
        video: {
          url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/video/005_hide_and_seek.mp4",
          s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/video/005_hide_and_seek.mp4"
        }
      }
    },
    {
      _id: "",
      episodeId: "043",
      title: "Tidying Up",
      description: "Peppa Pig and her family race to tidy up.",
      series: "Peppa Pig",
      releaseDate: "2025-01-15T00:00:00Z",
      contentItems: {
        image: {
          url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/043_tidying-up/image/043_tidying_up_cover.jpeg",
          s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/043_tidying-up/image/043_tidying_up_cover.jpeg"
        },
        video: {
          url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/043_tidying-up/video/043_tidying_up.mp4",
          s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/043_tidying-up/video/043_tidying_up.mp4"
        }
      }
    }
  ];
  

  const mockEpisodeData: { [key: string]: EpisodeData } = {    
    "005": {
    _id: "1",
    episodeId: "005",
    title: "Hide And Seek",
    description: "Peppa and her friends enjoy a fun day in the puddles.",
    series: "Peppa Pig",
    releaseDate: "2025-01-15T00:00:00Z",
    contentItems: {
      video: {
        url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/video/005_hide_and_seek.mp4",
        s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/043_tidying-up/video/043_tidying_up.mp4"
      },
      words: [],
      phrases: [
        {
          type: "phrase",
          text: "The boy has found somewhere to hide.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/img/the_boy_has_found_somewhere_to_hide.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/img/the_boy_has_found_somewhere_to_hide.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/female_standard/female_standard_the_boy_has_found_somewhere_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/female_standard/female_standard_the_boy_has_found_somewhere_to_hide.mp3",
                  transcript: {
                    fullText: "The boy has found somewhere to hide.",
                    words: [
                      {
                        word: "The",
                        start: 0.039,
                        end: 0.239
                      },
                      {
                        word: "boy",
                        start: 0.239,
                        end: 0.509
                      },
                      {
                        word: "has",
                        start: 0.509,
                        end: 0.759
                      },
                      {
                        word: "found",
                        start: 0.759,
                        end: 1.059
                      },
                      {
                        word: "somewhere",
                        start: 1.059,
                        end: 1.389
                      },
                      {
                        word: "to",
                        start: 1.389,
                        end: 1.6
                      },
                      {
                        word: "hide",
                        start: 1.6,
                        end: 2
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/female_distinct/female_distinct_the_boy_has_found_somewhere_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/female_distinct/female_distinct_the_boy_has_found_somewhere_to_hide.mp3",
                  transcript: {
                    fullText: "The boy has found somewhere to hide.",
                    words: [
                      {
                        word: "The",
                        start: 0.079,
                        end: 0.67
                      },
                      {
                        word: "boy",
                        start: 0.68,
                        end: 1.399
                      },
                      {
                        word: "has",
                        start: 1.399,
                        end: 2.24
                      },
                      {
                        word: "found",
                        start: 2.24,
                        end: 3.16
                      },
                      {
                        word: "somewhere",
                        start: 3.16,
                        end: 3.789
                      },
                      {
                        word: "to",
                        start: 3.789,
                        end: 4.639
                      },
                      {
                        word: "hide",
                        start: 4.639,
                        end: 5.239
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/male_standard/male_standard_the_boy_has_found_somewhere_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/male_standard/male_standard_the_boy_has_found_somewhere_to_hide.mp3",
                  transcript: {
                    fullText: "The boy has found somewhere to hide.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.28
                      },
                      {
                        word: "boy",
                        start: 0.28,
                        end: 0.479
                      },
                      {
                        word: "has",
                        start: 0.479,
                        end: 0.72
                      },
                      {
                        word: "found",
                        start: 0.72,
                        end: 1
                      },
                      {
                        word: "somewhere",
                        start: 1,
                        end: 1.32
                      },
                      {
                        word: "to",
                        start: 1.32,
                        end: 1.519
                      },
                      {
                        word: "hide",
                        start: 1.519,
                        end: 1.879
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/male_distinct/male_distinct_the_boy_has_found_somewhere_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/07_the_boy_has_found_somewhere_to_hide/audio/male_distinct/male_distinct_the_boy_has_found_somewhere_to_hide.mp3",
                  transcript: {
                    fullText: "The boy has found somewhere to hide.",
                    words: [
                      {
                        word: "The",
                        start: 0.109,
                        end: 0.709
                      },
                      {
                        word: "boy",
                        start: 0.72,
                        end: 1.23
                      },
                      {
                        word: "has",
                        start: 1.399,
                        end: 2.13
                      },
                      {
                        word: "found",
                        start: 2.13,
                        end: 2.88
                      },
                      {
                        word: "somewhere",
                        start: 2.88,
                        end: 3.64
                      },
                      {
                        word: "to",
                        start: 3.64,
                        end: 4.28
                      },
                      {
                        word: "hide",
                        start: 4.28,
                        end: 4.76
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "The girl has to find where the boy is hiding.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/img/the_girl_has_to_find_where_the_boy_is_hiding.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/img/the_girl_has_to_find_where_the_boy_is_hiding.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/female_standard/female_standard_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/female_standard/female_standard_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  transcript: {
                    fullText: "The girl has to find where the boy is hiding.",
                    words: [
                      {
                        word: "The",
                        start: 0.039,
                        end: 0.239
                      },
                      {
                        word: "girl",
                        start: 0.239,
                        end: 0.479
                      },
                      {
                        word: "has",
                        start: 0.479,
                        end: 0.72
                      },
                      {
                        word: "to",
                        start: 0.72,
                        end: 0.92
                      },
                      {
                        word: "find",
                        start: 0.92,
                        end: 1.159
                      },
                      {
                        word: "where",
                        start: 1.159,
                        end: 1.289
                      },
                      {
                        word: "the",
                        start: 1.289,
                        end: 1.519
                      },
                      {
                        word: "boy",
                        start: 1.519,
                        end: 1.69
                      },
                      {
                        word: "is",
                        start: 1.69,
                        end: 1.879
                      },
                      {
                        word: "hiding",
                        start: 1.879,
                        end: 2.359
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/male_distinct/male_distinct_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/male_distinct/male_distinct_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  transcript: {
                    fullText: "The girl has to find where the boy is hiding.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.68
                      },
                      {
                        word: "girl",
                        start: 0.68,
                        end: 1.149
                      },
                      {
                        word: "has",
                        start: 1.32,
                        end: 1.96
                      },
                      {
                        word: "to",
                        start: 1.96,
                        end: 2.599
                      },
                      {
                        word: "find",
                        start: 2.599,
                        end: 3.2
                      },
                      {
                        word: "where",
                        start: 3.2,
                        end: 3.839
                      },
                      {
                        word: "the",
                        start: 3.839,
                        end: 4.369
                      },
                      {
                        word: "boy",
                        start: 4.369,
                        end: 4.869
                      },
                      {
                        word: "is",
                        start: 4.869,
                        end: 5.48
                      },
                      {
                        word: "hiding",
                        start: 5.48,
                        end: 6.039
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/male_standard/male_standard_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/male_standard/male_standard_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  transcript: {
                    fullText: "The girl has to find where the boy is hiding.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.319
                      },
                      {
                        word: "girl",
                        start: 0.319,
                        end: 0.56
                      },
                      {
                        word: "has",
                        start: 0.56,
                        end: 0.72
                      },
                      {
                        word: "to",
                        start: 0.72,
                        end: 0.92
                      },
                      {
                        word: "find",
                        start: 0.92,
                        end: 1.159
                      },
                      {
                        word: "where",
                        start: 1.159,
                        end: 1.32
                      },
                      {
                        word: "the",
                        start: 1.32,
                        end: 1.48
                      },
                      {
                        word: "boy",
                        start: 1.48,
                        end: 1.669
                      },
                      {
                        word: "is",
                        start: 1.669,
                        end: 1.84
                      },
                      {
                        word: "hiding",
                        start: 1.84,
                        end: 2.2
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/female_distinct/female_distinct_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/03_the_girl_has_to_find_where_the_boy_is_hiding/audio/female_distinct/female_distinct_the_girl_has_to_find_where_the_boy_is_hiding.mp3",
                  transcript: {
                    fullText: "The girl has to find where the boy is hiding.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.75
                      },
                      {
                        word: "girl",
                        start: 0.759,
                        end: 1.35
                      },
                      {
                        word: "has",
                        start: 1.559,
                        end: 2.38
                      },
                      {
                        word: "to",
                        start: 2.38,
                        end: 3.2
                      },
                      {
                        word: "find",
                        start: 3.2,
                        end: 4.039
                      },
                      {
                        word: "where",
                        start: 4.039,
                        end: 4.8
                      },
                      {
                        word: "the",
                        start: 4.8,
                        end: 5.36
                      },
                      {
                        word: "boy",
                        start: 5.36,
                        end: 5.869
                      },
                      {
                        word: "is",
                        start: 5.869,
                        end: 6.51
                      },
                      {
                        word: "hiding",
                        start: 6.65,
                        end: 7.289
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "Found you.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/img/found_you.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/img/found_you.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/female_standard/female_standard_found_you.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/female_standard/female_standard_found_you.mp3",
                  transcript: {
                    fullText: "Foul you",
                    words: [
                      {
                        word: "Foul",
                        start: 0.009,
                        end: 0.439
                      },
                      {
                        word: "you",
                        start: 0.439,
                        end: 0.74
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/female_distinct/female_distinct_found_you.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/female_distinct/female_distinct_found_you.mp3",
                  transcript: {
                    fullText: "Found you.",
                    words: [
                      {
                        word: "Found",
                        start: 0.009,
                        end: 0.75
                      },
                      {
                        word: "you",
                        start: 0.75,
                        end: 1.409
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/male_standard/male_standard_found_you.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/male_standard/male_standard_found_you.mp3",
                  transcript: {
                    fullText: "Found you",
                    words: [
                      {
                        word: "Found",
                        start: 0.019,
                        end: 0.4
                      },
                      {
                        word: "you",
                        start: 0.4,
                        end: 0.74
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/male_distinct/male_distinct_found_you.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/09_found_you/audio/male_distinct/male_distinct_found_you.mp3",
                  transcript: {
                    fullText: "Found you.",
                    words: [
                      {
                        word: "Found",
                        start: 0.019,
                        end: 0.769
                      },
                      {
                        word: "you",
                        start: 0.769,
                        end: 1.32
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "Now it is the girl's turn to hide.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/img/now_it_is_the_girls_turn_to_hide.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/img/now_it_is_the_girls_turn_to_hide.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/female_standard/female_standard_now_it_is_the_girls_turn_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/female_standard/female_standard_now_it_is_the_girls_turn_to_hide.mp3  ",
                  transcript: {
                    fullText: "Now it is the girl's turn to hide.",
                    words: [
                      {
                        word: "Now",
                        start: 0.14,
                        end: 0.36
                      },
                      {
                        word: "it",
                        start: 0.36,
                        end: 0.479
                      },
                      {
                        word: "is",
                        start: 0.479,
                        end: 0.639
                      },
                      {
                        word: "the",
                        start: 0.639,
                        end: 0.8
                      },
                      {
                        word: "girl's",
                        start: 0.8,
                        end: 1.159
                      },
                      {
                        word: "turn",
                        start: 1.159,
                        end: 1.399
                      },
                      {
                        word: "to",
                        start: 1.399,
                        end: 1.559
                      },
                      {
                        word: "hide",
                        start: 1.559,
                        end: 1.919
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/female_distinct/female_distinct_now_it_is_the_girls_turn_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/female_distinct/female_distinct_now_it_is_the_girls_turn_to_hide.mp3",
                  transcript: {
                    fullText: "Now it is the girl's turn to hide.",
                    words: [
                      {
                        word: "Now",
                        start: 0.159,
                        end: 0.67
                      },
                      {
                        word: "it",
                        start: 0.839,
                        end: 1.159
                      },
                      {
                        word: "is",
                        start: 1.159,
                        end: 2.079
                      },
                      {
                        word: "the",
                        start: 2.079,
                        end: 2.68
                      },
                      {
                        word: "girl's",
                        start: 2.68,
                        end: 3.64
                      },
                      {
                        word: "turn",
                        start: 3.64,
                        end: 4.19
                      },
                      {
                        word: "to",
                        start: 4.409,
                        end: 5.119
                      },
                      {
                        word: "hide",
                        start: 5.119,
                        end: 5.75
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/male_standard/male_standard_now_it_is_the_girls_turn_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/male_standard/male_standard_now_it_is_the_girls_turn_to_hide.mp3",
                  transcript: {
                    fullText: "Now it is the girl's turn to hide.",
                    words: [
                      {
                        word: "Now",
                        start: 0.159,
                        end: 0.319
                      },
                      {
                        word: "it",
                        start: 0.319,
                        end: 0.439
                      },
                      {
                        word: "is",
                        start: 0.439,
                        end: 0.6
                      },
                      {
                        word: "the",
                        start: 0.6,
                        end: 0.72
                      },
                      {
                        word: "girl's",
                        start: 0.72,
                        end: 1.08
                      },
                      {
                        word: "turn",
                        start: 1.08,
                        end: 1.24
                      },
                      {
                        word: "to",
                        start: 1.24,
                        end: 1.44
                      },
                      {
                        word: "hide",
                        start: 1.44,
                        end: 1.759
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/male_distinct/male_distinct_now_it_is_the_girls_turn_to_hide.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/08_now_it_is_the_girls_turn_to_hide/audio/male_distinct/male_distinct_now_it_is_the_girls_turn_to_hide.mp3",
                  transcript: {
                    fullText: "Now it is the girl's turn to hide.",
                    words: [
                      {
                        word: "Now",
                        start: 0.18,
                        end: 0.68
                      },
                      {
                        word: "it",
                        start: 0.68,
                        end: 0.99
                      },
                      {
                        word: "is",
                        start: 1.039,
                        end: 1.639
                      },
                      {
                        word: "the",
                        start: 1.639,
                        end: 2.24
                      },
                      {
                        word: "girl's",
                        start: 2.24,
                        end: 2.96
                      },
                      {
                        word: "turn",
                        start: 2.96,
                        end: 3.559
                      },
                      {
                        word: "to",
                        start: 3.559,
                        end: 4.159
                      },
                      {
                        word: "hide",
                        start: 4.159,
                        end: 4.639
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "The girl isn't hiding under the table.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/img/the_girl_isnt_hiding_under_the_table.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/img/the_girl_isnt_hiding_under_the_table.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/female_standard/female_standard_the_girl_isnt_hiding_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/female_standard/female_standard_the_girl_isnt_hiding_under_the_table.mp3",
                  transcript: {
                    fullText: "The girl isn't hiding under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.039,
                        end: 0.2
                      },
                      {
                        word: "girl",
                        start: 0.2,
                        end: 0.439
                      },
                      {
                        word: "isn't",
                        start: 0.439,
                        end: 0.8
                      },
                      {
                        word: "hiding",
                        start: 0.8,
                        end: 1.159
                      },
                      {
                        word: "under",
                        start: 1.159,
                        end: 1.399
                      },
                      {
                        word: "the",
                        start: 1.399,
                        end: 1.58
                      },
                      {
                        word: "table",
                        start: 1.58,
                        end: 2
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/female_distinct/female_distinct_the_girl_isnt_hiding_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/female_distinct/female_distinct_the_girl_isnt_hiding_under_the_table.mp3",
                  transcript: {
                    fullText: "The girl isn't hiding under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.509
                      },
                      {
                        word: "girl",
                        start: 0.68,
                        end: 1.23
                      },
                      {
                        word: "isn't",
                        start: 1.32,
                        end: 2.119
                      },
                      {
                        word: "hiding",
                        start: 2.119,
                        end: 2.75
                      },
                      {
                        word: "under",
                        start: 2.88,
                        end: 3.43
                      },
                      {
                        word: "the",
                        start: 3.43,
                        end: 4.15
                      },
                      {
                        word: "table",
                        start: 4.15,
                        end: 4.75
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/male_standard/male_standard_the_girl_isnt_hiding_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/male_standard/male_standard_the_girl_isnt_hiding_under_the_table.mp3",
                  transcript: {
                    fullText: "The girl isn't hiding under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.109,
                        end: 0.319
                      },
                      {
                        word: "girl",
                        start: 0.319,
                        end: 0.6
                      },
                      {
                        word: "isn't",
                        start: 0.6,
                        end: 0.92
                      },
                      {
                        word: "hiding",
                        start: 0.92,
                        end: 1.24
                      },
                      {
                        word: "under",
                        start: 1.24,
                        end: 1.429
                      },
                      {
                        word: "the",
                        start: 1.429,
                        end: 1.639
                      },
                      {
                        word: "table",
                        start: 1.639,
                        end: 2
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/male_distinct/male_distinct_the_girl_isnt_hiding_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/02_the_girl_isnt_hiding_under_the_table/audio/male_distinct/male_distinct_the_girl_isnt_hiding_under_the_table.mp3",
                  transcript: {
                    fullText: "The girl isn't hiding under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.68
                      },
                      {
                        word: "girl",
                        start: 0.689,
                        end: 1.25
                      },
                      {
                        word: "isn't",
                        start: 1.25,
                        end: 1.889
                      },
                      {
                        word: "hiding",
                        start: 1.889,
                        end: 2.599
                      },
                      {
                        word: "under",
                        start: 2.599,
                        end: 3.069
                      },
                      {
                        word: "the",
                        start: 3.069,
                        end: 3.839
                      },
                      {
                        word: "table",
                        start: 3.839,
                        end: 4.429
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "What was that strange noise?",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/img/what_was_that_strange_noise.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/img/what_was_that_strange_noise.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/female_standard/female_standard_what_was_that_strange_noise.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/female_standard/female_standard_what_was_that_strange_noise.mp3",
                  transcript: {
                    fullText: "What was that strange noise?",
                    words: [
                      {
                        word: "What",
                        start: 0.009,
                        end: 0.219
                      },
                      {
                        word: "was",
                        start: 0.219,
                        end: 0.4
                      },
                      {
                        word: "that",
                        start: 0.4,
                        end: 0.759
                      },
                      {
                        word: "strange",
                        start: 0.759,
                        end: 1.12
                      },
                      {
                        word: "noise",
                        start: 1.12,
                        end: 1.57
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/female_distinct/female_distinct_what_was_that_strange_noise.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/female_distinct/female_distinct_what_was_that_strange_noise.mp3",
                  transcript: {
                    fullText: "What was that strange noise?",
                    words: [
                      {
                        word: "What",
                        start: 0.079,
                        end: 0.68
                      },
                      {
                        word: "was",
                        start: 0.68,
                        end: 1.139
                      },
                      {
                        word: "that",
                        start: 1.279,
                        end: 2.039
                      },
                      {
                        word: "strange",
                        start: 2.039,
                        end: 2.759
                      },
                      {
                        word: "noise",
                        start: 2.759,
                        end: 3.41
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/male_standard/male_standard_what_was_that_strange_noise.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/male_standard/male_standard_what_was_that_strange_noise.mp3",
                  transcript: {
                    fullText: "What was that strange noise?",
                    words: [
                      {
                        word: "What",
                        start: 0.119,
                        end: 0.31
                      },
                      {
                        word: "was",
                        start: 0.31,
                        end: 0.479
                      },
                      {
                        word: "that",
                        start: 0.479,
                        end: 0.75
                      },
                      {
                        word: "strange",
                        start: 0.759,
                        end: 1.12
                      },
                      {
                        word: "noise",
                        start: 1.12,
                        end: 1.49
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/male_distinct/male_distinct_what_was_that_strange_noise.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/01_what_was_that_strange_noise/audio/male_distinct/male_distinct_what_was_that_strange_noise.mp3",
                  transcript: {
                    fullText: "What was that strange noise?",
                    words: [
                      {
                        word: "What",
                        start: 0.119,
                        end: 0.639
                      },
                      {
                        word: "was",
                        start: 0.639,
                        end: 1.279
                      },
                      {
                        word: "that",
                        start: 1.279,
                        end: 1.95
                      },
                      {
                        word: "strange",
                        start: 1.96,
                        end: 2.64
                      },
                      {
                        word: "noise",
                        start: 2.64,
                        end: 3.24
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "Close your eyes and start counting.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/img/close_your_eyes_and_start_counting.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/img/close_your_eyes_and_start_counting.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/female_standard/female_standard_close_your_eyes_and_start_counting.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/female_standard/female_standard_close_your_eyes_and_start_counting.mp3",
                  transcript: {
                    fullText: "Close your eyes and start counting.",
                    words: [
                      {
                        word: "Close",
                        start: 0.009,
                        end: 0.439
                      },
                      {
                        word: "your",
                        start: 0.439,
                        end: 0.639
                      },
                      {
                        word: "eyes",
                        start: 0.639,
                        end: 1
                      },
                      {
                        word: "and",
                        start: 1,
                        end: 1.279
                      },
                      {
                        word: "start",
                        start: 1.279,
                        end: 1.559
                      },
                      {
                        word: "counting",
                        start: 1.559,
                        end: 2.069
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/female_distinct/female_distinct_close_your_eyes_and_start_counting.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/female_distinct/female_distinct_close_your_eyes_and_start_counting.mp3",
                  transcript: {
                    fullText: "Close your eyes and start counting.",
                    words: [
                      {
                        word: "Close",
                        start: 0.009,
                        end: 1.039
                      },
                      {
                        word: "your",
                        start: 1.039,
                        end: 1.6
                      },
                      {
                        word: "eyes",
                        start: 1.6,
                        end: 2.44
                      },
                      {
                        word: "and",
                        start: 2.44,
                        end: 3.319
                      },
                      {
                        word: "start",
                        start: 3.329,
                        end: 4
                      },
                      {
                        word: "counting",
                        start: 4,
                        end: 4.719
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/male_standard/male_standard_close_your_eyes_and_start_counting.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/male_standard/male_standard_close_your_eyes_and_start_counting.mp3",
                  transcript: {
                    fullText: "Close your eyes and start counting.",
                    words: [
                      {
                        word: "Close",
                        start: 0.119,
                        end: 0.439
                      },
                      {
                        word: "your",
                        start: 0.439,
                        end: 0.639
                      },
                      {
                        word: "eyes",
                        start: 0.639,
                        end: 0.839
                      },
                      {
                        word: "and",
                        start: 0.839,
                        end: 1.12
                      },
                      {
                        word: "start",
                        start: 1.12,
                        end: 1.36
                      },
                      {
                        word: "counting",
                        start: 1.36,
                        end: 1.759
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/male_distinct/male_distinct_close_your_eyes_and_start_counting.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/10_close_your_eyes_and_start_counting/audio/male_distinct/male_distinct_close_your_eyes_and_start_counting.mp3",
                  transcript: {
                    fullText: "Close your eyes and start counting.",
                    words: [
                      {
                        word: "Close",
                        start: 0.119,
                        end: 0.829
                      },
                      {
                        word: "your",
                        start: 0.839,
                        end: 1.399
                      },
                      {
                        word: "eyes",
                        start: 1.399,
                        end: 2
                      },
                      {
                        word: "and",
                        start: 2,
                        end: 2.799
                      },
                      {
                        word: "start",
                        start: 2.799,
                        end: 3.329
                      },
                      {
                        word: "counting",
                        start: 3.329,
                        end: 3.91
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "The boy is not in the toy basket.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/img/the_boy_is_not_in_the_toy_basket.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/img/the_boy_is_not_in_the_toy_basket.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/female_standard/female_standard_the_boy_is_not_in_the_toy_basket.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/female_standard/female_standard_the_boy_is_not_in_the_toy_basket.mp3",
                  transcript: {
                    fullText: "The boy is not in the toy basket.",
                    words: [
                      {
                        word: "The",
                        start: 0.039,
                        end: 0.209
                      },
                      {
                        word: "boy",
                        start: 0.209,
                        end: 0.4
                      },
                      {
                        word: "is",
                        start: 0.4,
                        end: 0.56
                      },
                      {
                        word: "not",
                        start: 0.56,
                        end: 0.79
                      },
                      {
                        word: "in",
                        start: 0.79,
                        end: 0.879
                      },
                      {
                        word: "the",
                        start: 0.879,
                        end: 1.039
                      },
                      {
                        word: "toy",
                        start: 1.039,
                        end: 1.279
                      },
                      {
                        word: "basket",
                        start: 1.279,
                        end: 1.84
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/female_distinct/female_distinct_the_boy_is_not_in_the_toy_basket.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/female_distinct/female_distinct_the_boy_is_not_in_the_toy_basket.mp3",
                  transcript: {
                    fullText: "The boy is not in the toy basket.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.709
                      },
                      {
                        word: "boy",
                        start: 0.72,
                        end: 1.23
                      },
                      {
                        word: "is",
                        start: 1.32,
                        end: 2.16
                      },
                      {
                        word: "not",
                        start: 2.16,
                        end: 2.799
                      },
                      {
                        word: "in",
                        start: 2.799,
                        end: 3.39
                      },
                      {
                        word: "the",
                        start: 3.39,
                        end: 3.96
                      },
                      {
                        word: "toy",
                        start: 3.96,
                        end: 4.55
                      },
                      {
                        word: "basket",
                        start: 4.55,
                        end: 5.28
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/male_standard/male_standard_the_boy_is_not_in_the_toy_basket.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/male_standard/male_standard_the_boy_is_not_in_the_toy_basket.mp3",
                  transcript: {
                    fullText: "The boy is not in the toy basket.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.28
                      },
                      {
                        word: "boy",
                        start: 0.28,
                        end: 0.439
                      },
                      {
                        word: "is",
                        start: 0.439,
                        end: 0.68
                      },
                      {
                        word: "not",
                        start: 0.68,
                        end: 0.8
                      },
                      {
                        word: "in",
                        start: 0.8,
                        end: 0.939
                      },
                      {
                        word: "the",
                        start: 0.939,
                        end: 1.12
                      },
                      {
                        word: "toy",
                        start: 1.12,
                        end: 1.32
                      },
                      {
                        word: "basket",
                        start: 1.32,
                        end: 1.799
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/male_distinct/male_distinct_the_boy_is_not_in_the_toy_basket.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/06_the_boy_is_not_in_the_toy_basket/audio/male_distinct/male_distinct_the_boy_is_not_in_the_toy_basket.mp3",
                  transcript: {
                    fullText: "The boy is not in the toy basket.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.67
                      },
                      {
                        word: "boy",
                        start: 0.68,
                        end: 1.19
                      },
                      {
                        word: "is",
                        start: 1.19,
                        end: 1.919
                      },
                      {
                        word: "not",
                        start: 1.919,
                        end: 2.44
                      },
                      {
                        word: "in",
                        start: 2.44,
                        end: 3
                      },
                      {
                        word: "the",
                        start: 3,
                        end: 3.519
                      },
                      {
                        word: "toy",
                        start: 3.519,
                        end: 4.03
                      },
                      {
                        word: "basket",
                        start: 4.03,
                        end: 4.8
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "The boy was hiding behind Dad's newspaper all the time.",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/img/the_boy_was_hiding_behind_dads_newspaper_all_the_time.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/img/the_boy_was_hiding_behind_dads_newspaper_all_the_time.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/female_standard/female_standard_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/female_standard/female_standard_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  transcript: {
                    fullText: "The boy was hiding behind dad's newspaper all the time.",
                    words: [
                      {
                        word: "The",
                        start: 0.019,
                        end: 0.23
                      },
                      {
                        word: "boy",
                        start: 0.23,
                        end: 0.439
                      },
                      {
                        word: "was",
                        start: 0.439,
                        end: 0.639
                      },
                      {
                        word: "hiding",
                        start: 0.639,
                        end: 1.12
                      },
                      {
                        word: "behind",
                        start: 1.12,
                        end: 1.44
                      },
                      {
                        word: "dad's",
                        start: 1.44,
                        end: 1.799
                      },
                      {
                        word: "newspaper",
                        start: 1.799,
                        end: 2.39
                      },
                      {
                        word: "all",
                        start: 2.39,
                        end: 2.599
                      },
                      {
                        word: "the",
                        start: 2.599,
                        end: 2.839
                      },
                      {
                        word: "time",
                        start: 2.839,
                        end: 3.2
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/female_distinct/female_distinct_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/female_distinct/female_distinct_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  transcript: {
                    fullText: "The boy was hiding behind dad's newspaper all the time.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.67
                      },
                      {
                        word: "boy",
                        start: 0.67,
                        end: 1.19
                      },
                      {
                        word: "was",
                        start: 1.36,
                        end: 2.17
                      },
                      {
                        word: "hiding",
                        start: 2.17,
                        end: 3.079
                      },
                      {
                        word: "behind",
                        start: 3.079,
                        end: 3.92
                      },
                      {
                        word: "dad's",
                        start: 3.92,
                        end: 4.84
                      },
                      {
                        word: "newspaper",
                        start: 4.84,
                        end: 5.84
                      },
                      {
                        word: "all",
                        start: 5.84,
                        end: 6.32
                      },
                      {
                        word: "the",
                        start: 6.32,
                        end: 7.039
                      },
                      {
                        word: "time",
                        start: 7.039,
                        end: 7.59
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/male_standard/male_standard_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/male_standard/male_standard_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  transcript: {
                    fullText: "The boy was hiding behind Dad's newspaper all the time.",
                    words: [
                      {
                        word: "The",
                        start: 0.109,
                        end: 0.28
                      },
                      {
                        word: "boy",
                        start: 0.28,
                        end: 0.439
                      },
                      {
                        word: "was",
                        start: 0.439,
                        end: 0.68
                      },
                      {
                        word: "hiding",
                        start: 0.68,
                        end: 1.08
                      },
                      {
                        word: "behind",
                        start: 1.08,
                        end: 1.36
                      },
                      {
                        word: "Dad's",
                        start: 1.36,
                        end: 1.679
                      },
                      {
                        word: "newspaper",
                        start: 1.679,
                        end: 2.2
                      },
                      {
                        word: "all",
                        start: 2.2,
                        end: 2.319
                      },
                      {
                        word: "the",
                        start: 2.319,
                        end: 2.559
                      },
                      {
                        word: "time",
                        start: 2.559,
                        end: 2.869
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/male_distinct/male_distinct_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3 ",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/04_the_boy_was_hiding_behind_dads_newspaper_all_the_time/audio/male_distinct/male_distinct_the_boy_was_hiding_behind_dads_newspaper_all_the_t.mp3",
                  transcript: {
                    fullText: "The boy was hiding behind dad's newspaper all the time.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.67
                      },
                      {
                        word: "boy",
                        start: 0.67,
                        end: 1.19
                      },
                      {
                        word: "was",
                        start: 1.36,
                        end: 2.17
                      },
                      {
                        word: "hiding",
                        start: 2.17,
                        end: 3.079
                      },
                      {
                        word: "behind",
                        start: 3.079,
                        end: 3.92
                      },
                      {
                        word: "dad's",
                        start: 3.92,
                        end: 4.84
                      },
                      {
                        word: "newspaper",
                        start: 4.84,
                        end: 5.84
                      },
                      {
                        word: "all",
                        start: 5.84,
                        end: 6.32
                      },
                      {
                        word: "the",
                        start: 6.32,
                        end: 7.039
                      },
                      {
                        word: "time",
                        start: 7.039,
                        end: 7.59
                      }
                    ]
                  }
                }
              }
            }
          }
        },
        {
          type: "phrase",
          text: "The boy isn’t under the table",
          mediaBundle: {
            image: {
              url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/img/the_boy_isnt_under_the_table.png",
              s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/img/the_boy_isnt_under_the_table.png"
            },
            audio: {
              defaultAudioGender: "male",
              female: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/female_standard/female_standard_the_boy_isnt_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/female_standard/female_standard_the_boy_isnt_under_the_table.mp3",
                  transcript: {
                    fullText: "The boy isn't under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.019,
                        end: 0.239
                      },
                      {
                        word: "boy",
                        start: 0.239,
                        end: 0.439
                      },
                      {
                        word: "isn't",
                        start: 0.439,
                        end: 0.759
                      },
                      {
                        word: "under",
                        start: 0.759,
                        end: 0.99
                      },
                      {
                        word: "the",
                        start: 1,
                        end: 1.24
                      },
                      {
                        word: "table",
                        start: 1.24,
                        end: 1.629
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/female_distinct/female_distinct_the_boy_isnt_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/female_distinct/female_distinct_the_boy_isnt_under_the_table.mp3",
                  transcript: {
                    fullText: "The boy isn't under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.1,
                        end: 0.67
                      },
                      {
                        word: "boy",
                        start: 0.68,
                        end: 1.19
                      },
                      {
                        word: "isn't",
                        start: 1.279,
                        end: 2.009
                      },
                      {
                        word: "under",
                        start: 2.009,
                        end: 2.589
                      },
                      {
                        word: "the",
                        start: 2.589,
                        end: 3.319
                      },
                      {
                        word: "table",
                        start: 3.319,
                        end: 3.94
                      }
                    ]
                  }
                }
              },
              male: {
                standard: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/male_standard/male_standard_the_boy_isnt_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/male_standard/male_standard_the_boy_isnt_under_the_table.mp3",
                  transcript: {
                    fullText: "The boy isn't under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.28
                      },
                      {
                        word: "boy",
                        start: 0.28,
                        end: 0.479
                      },
                      {
                        word: "isn't",
                        start: 0.479,
                        end: 0.8
                      },
                      {
                        word: "under",
                        start: 0.8,
                        end: 1.039
                      },
                      {
                        word: "the",
                        start: 1.039,
                        end: 1.2
                      },
                      {
                        word: "table",
                        start: 1.2,
                        end: 1.59
                      }
                    ]
                  }
                },
                distinct: {
                  url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/male_distinct/male_distinct_the_boy_isnt_under_the_table.mp3",
                  s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/005_hide-and-seek/phrases/05_the_boy_isnt_under_the_table/audio/male_distinct/male_distinct_the_boy_isnt_under_the_table.mp3",
                  transcript: {
                    fullText: "The boy isn't under the table.",
                    words: [
                      {
                        word: "The",
                        start: 0.119,
                        end: 0.709
                      },
                      {
                        word: "boy",
                        start: 0.72,
                        end: 1.19
                      },
                      {
                        word: "isn't",
                        start: 1.19,
                        end: 1.879
                      },
                      {
                        word: "under",
                        start: 1.879,
                        end: 2.349
                      },
                      {
                        word: "the",
                        start: 2.349,
                        end: 3.039
                      },
                      {
                        word: "table",
                        start: 3.039,
                        end: 3.67
                      }
                    ]
                  }
                }
              }
            }
          }
        }
      ]
    },
    createdAt: "2025-02-15T14:30:00Z",
    updatedAt: "2025-02-18T09:00:00Z"
  },
  "043": {
    _id: "",
    episodeId: "043",
    title: "Tidying Up",
    description: "Peppa Pig and her family race to tidy up.",
    series: "Peppa Pig",
    releaseDate: "2025-01-15T00:00:00Z",
    contentItems: {
      image: {
        url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/043_tidying-up/image/043_tidying_up_cover.jpeg",
        s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/043_tidying-up/image/043_tidying_up_cover.jpeg"
      },
      video: {
        url: "https://chaseriddick-peppa-pig-language-learning-app.s3.us-east-1.amazonaws.com/peppa-pig/episodes/043_tidying-up/video/043_tidying_up.mp4",
        s3Uri: "s3://chaseriddick-peppa-pig-language-learning-app/peppa-pig/episodes/043_tidying-up/video/043_tidying_up.mp4"
      },
      words: [],
      phrases: [],
    },
    createdAt: "2025-02-15T14:30:00Z",
    updatedAt: "2025-02-18T09:00:00Z"
  }
};


// Fetch all episodes (metadata only) with a 500ms delay  
export const fetchEpisodes = async (): Promise<EpisodeMetadata[]> => {  
  return new Promise((resolve) => {  
    setTimeout(() => resolve(mockEpisodes), 500); // Simulate network delay  
  });  
};  

// Fetch a single episode (detailed data) with a 500ms delay  
export const fetchEpisodeById = async (episodeId: string): Promise<EpisodeData | undefined> => {  
  return new Promise((resolve) => {  
    setTimeout(() => resolve(mockEpisodeData[episodeId]), 500); // Simulate network delay  
  });  
};  