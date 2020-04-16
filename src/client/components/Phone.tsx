import * as React from 'react';
import { Box, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

// import iPhoneImage from '../assets/iphone.png';

const useStyles = makeStyles(() => ({
  app: {
    alignItems: 'center',
    display: 'flex',
    flexDirection: 'column',
    height: '80px',
    width: '80px',
  },
  appImage: { borderRadius: '10%', height: '80px', width: '80px' },
  appName: {
    textAlign: 'center',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap',
  },
  container: {},
  innerContainer: {
    display: 'grid',
    height: '975.031px',
    gridGap: '26px',
    gridTemplateColumns: '80px 80px 80px 80px',
    gridTemplateRows: '80px 80px 80px 80px',
    left: 'calc(50% - 250px)',
    padding: '50px',
    position: 'absolute',
    width: '400px',
  },
}));

const Phone = ({ sorted }) => {
  const classes = useStyles();

  return (
    <Box className={classes.container}>
      {!sorted && (
        <Typography variant="body1">
          Upload a csv document to see the sorted applications
        </Typography>
      )}
      {sorted && (
        <Box className={classes.innerContainer} id="application-container">
          {sorted.map(({ icon, name }, i) => (
            <Box className={classes.app} key={i}>
              <img
                className={classes.appImage}
                src={`data:image/jpeg;base64,${icon.base64}`}
              />
              <span className={classes.appName}>{name}</span>
            </Box>
          ))}
        </Box>
      )}
    </Box>
  );
};

// const Phone = ({ sorted }) => {
//   return (
//     <>
//       <img
//         alt="iPhone"
//         src={iPhoneImage}
//         style={{
//           left: 'calc(50% - 250px)',
//           position: 'absolute',
//           width: '500px',
//         }}
//       />
//       {sorted && (
//         <div
//           id="application-container"
//           style={{
//             display: 'grid',
//             height: '975.031px',
//             gridGap: '26px',
//             gridTemplateColumns: '80px 80px 80px 80px',
//             gridTemplateRows: '80px 80px 80px 80px',
//             left: 'calc(50% - 250px)',
//             padding: '50px',
//             position: 'absolute',
//             width: '400px',
//           }}
//         >
//           {sorted.map(({ icon, name }, i) => (
//             <div
//               key={i}
//               style={{
//                 alignItems: 'center',
//                 display: 'flex',
//                 flexDirection: 'column',
//                 height: '80px',
//                 width: '80px',
//               }}
//             >
//               <img
//                 src={`data:image/jpeg;base64,${icon.base64}`}
//                 style={{ borderRadius: '10%', height: '80px', width: '80px' }}
//               />
//               <span
//                 style={{
//                   textAlign: 'center',
//                   textOverflow: 'ellipsis',
//                   whiteSpace: 'nowrap',
//                 }}
//               >
//                 {name}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}
//     </>
//   );
// };

export default Phone;
