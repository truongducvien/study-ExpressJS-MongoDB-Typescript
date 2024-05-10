import { envConfig, mailTransporter } from '@/config';
import { User } from '@/models';
import {
  BadRequestError,
  JwtUserPayload,
  JwtVerifyEmailPayload,
  LogInPayload,
  UserGoogleResponse,
  UserSchemaType
} from '@/types';
import {
  checkExisted,
  compareKey,
  generateToken,
  hashKey,
  sendError,
  sendGetSuccess,
  sendPostSuccess,
  verifyToken
} from '@/utils';
import { Request, Response } from 'express';

const register = async (req: Request, res: Response) => {
  try {
    const isMailExisted = await checkExisted<UserSchemaType>(User, {
      email: req.body.email
    });

    if (isMailExisted) {
      throw new BadRequestError('Email has already existed');
    }

    const hashedPass = await hashKey(req.body.password);
    const newUser = await User.create({
      ...req.body,
      password: hashedPass
    } as UserSchemaType);

    // Send verification email to user:
    await mailTransporter.send({
      to: newUser.email,
      templateId: envConfig.SENDGRID_VERIFY_MAIL_TEMPLATE_ID,
      dynamicTemplateData: {
        name: newUser.name,
        verification_url: `${envConfig.PUBLIC_FE_URL}/verify.html?userId=${newUser._id}`
      }
    });

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    const { password, ...rest } = newUser.toJSON();
    sendPostSuccess(res, rest);
  } catch (error) {
    sendError(res, error);
  }
};

const logIn = async (req: Request, res: Response) => {
  try {
    const payload = req.body as LogInPayload;
    const user = (await User.findOne({ email: payload.email }))?.toJSON();

    if (!user) {
      throw new BadRequestError('This email has not been registered');
    }

    const plainPass = payload.password;
    const hashedPass = user.password;

    // Compare password:
    const isPasswordMatched = await compareKey(plainPass, hashedPass);

    if (!isPasswordMatched) {
      throw new BadRequestError('Password is incorrect');
    }

    // Generate JWT:
    const bearerToken = generateToken({
      email: user.email,
      password: hashedPass,
      role: user.role
    } as JwtUserPayload);

    sendGetSuccess(res, { user, bearerToken });
  } catch (error) {
    sendError(res, error);
  }
};

const verifyAccount = async (req: Request, res: Response) => {
  try {
    const userId = req.params?.userId as string;
    const user = await User.findById(userId);

    if (user?.isVerified) {
      throw new BadRequestError('This account has been verified');
    }

    const updatedUser = await User.updateOne(
      { _id: userId },
      { isVerified: true }
    );

    // Generate a verify token from user's email:
    const verifyToken = generateToken({
      email: user.email
    } as JwtVerifyEmailPayload);

    // Send information email to user:
    await mailTransporter.send({
      to: user.email,
      templateId: envConfig.SENDGRID_VERIFY_MAIL_SUCCESS_TEMPLATE_ID,
      dynamicTemplateData: {
        name: user.name,
        page_url: `${envConfig.PUBLIC_FE_URL}?token=${verifyToken}`
      }
    });
    sendGetSuccess(res, { user: updatedUser });
  } catch (error) {
    sendError(res, error);
  }
};

const handleGoogleRedirect = async (req: Request, res: Response) => {
  try {
    const redirectURL = new URL(envConfig.PUBLIC_FE_URL);
    const userGoogleRes: UserGoogleResponse = req.session['passport'].user;

    // Check exist:
    const existUser = await checkExisted(User, { googleId: userGoogleRes.id });
    if (!existUser) {
      await User.create({
        name: userGoogleRes.displayName,
        email: userGoogleRes.emails[0].value,
        googleId: userGoogleRes.id
      });
    }
    const verifyToken = generateToken(
      {
        email: userGoogleRes.emails[0].value
      },
      {
        expiresIn: 60 // 60s
      }
    );
    redirectURL.searchParams.append('token', verifyToken);
    res.redirect(redirectURL.href);
  } catch (error) {
    sendError(res, error);
  }
};

const verifyRedirectToken = async (req: Request, res: Response) => {
  try {
    const encode = verifyToken<JwtVerifyEmailPayload>(req.body.token);
    const user = await User.findOne({ email: encode.email });

    if (user) {
      // Generate access token:
      const bearerToken = generateToken({
        email: user.email,
        password: user.password,
        role: user.role
      } as JwtUserPayload);

      sendGetSuccess(res, { user, bearerToken });
    } else {
      throw new BadRequestError('Something went wrong');
    }
  } catch (error) {
    console.log({ error });
    sendError(res, error);
  }
};

export {
  register,
  logIn,
  verifyAccount,
  handleGoogleRedirect,
  verifyRedirectToken
};
