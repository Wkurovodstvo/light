// import jwt from 'jsonwebtoken';
// import {User, Token} from "../../models";
// import {UnauthorizedError, PermissionError} from "../errors/customError";
// import _ from "lodash";
//
// const tokenCreator = (user) => {
//     const accessToken = jwt.sign({
//             id: user.id,
//             role: user.role,
//             gender: user.gender
//         },
//         "secretA"/*process.env.SECRET*/, {expiresIn: "10m"}
//     );
//     const refreshToken = jwt.sign({
//             id: user.id,
//             role: user.role,
//             gender: user.gender
//         },
//         "secretA"/*process.env.REFRESH_SECRET*/, {expiresIn: "60d"}
//     );
//     return {accessToken, refreshToken};
// };
//
// module.exports.tokenCreator = tokenCreator;
//
// module.exports.getUserFromToken = async (req, res, next) => {
//     const {authorization} = req.headers;
//     if(authorization && authorization.includes("Bearer")) {
//         const auth = authorization.substring("Bearer ".length);
//         try {
//             const {id} = jwt.verify(auth, "secretA"/*process.env.SECRET*/);
//             const foundUser = await User.findOne({where: {id}});
//             if (foundUser) {
//                 if(foundUser.dataValues.isActive) {
//                     delete foundUser.dataValues.password;
//                     res.send(foundUser);
//                 } else {
//                     next(new PermissionError("This user is blocked!"));
//                 }
//             } else {
//                 next(new UnauthorizedError("Such user doesn't exist!"));
//             }
//         } catch (e) {
//             next(new UnauthorizedError("Access token expired!"));
//         }
//     } else {
//         next(new UnauthorizedError("Invalid token data!"));
//     }
// };
//
// module.exports.checkRefreshToken = async (req,res,next) => {
//     const {token} = req.body;
//     try {
//         const {id} = jwt.verify(token, "secretR"/*process.env.REFRESH_SECRET*/);
//         const foundUser = await User.findOne({
//             where: {id},
//             include: [{
//                 model: Token,
//                 as: 'tokens',
//             }],
//         });
//         if (foundUser) {
//             const {token: foundRefreshToken} = _.find(foundUser.tokens, {token});
//             jwt.verify(foundRefreshToken, "secretR"/*process.env.REFRESH_SECRET*/);
//             const {refreshToken, accessToken} = tokenCreator(foundUser);
//             await Token.update({
//                 token: refreshToken
//             }, {
//                 where: {
//                     token: foundRefreshToken
//                 }
//             });
//             res.send({user: foundUser, refreshToken, accessToken, authSuccess: true});
//         } else {
//             next(new UnauthorizedError("Such user doesn't exist!"));
//         }
//     } catch (e) {
//         await Token.destroy({
//             where: {token}
//         });
//         next(new UnauthorizedError("Refresh token expired!"));
//     }
// };
//
// module.exports.removeRefreshToken = async (req,res,next) => {
//     const {token} = req.params;
//     try {
//         await Token.destroy({
//             where: {token}
//         });
//         res.sendStatus(200);
//     } catch (e) {
//         next(e);
//     }
// };