module.exports =  {
    dependencies: {
        'react-native-code-push': {
          platforms: {
            android: {
              sourceDir: '../node_modules/react-native-code-push/android/app',
            },
          },
        },
      },
    project: {
        ios :{},
        android : {},
    },
    assets :[
        './app/assets/fonts/',
        'react-native-vector-icons'
    ]
}
