import UserDTO from '../DTO/user.dto.js';
import { logger } from '../utils/logger.js';


class SessionsController {
    currentSession = async (req, res) => {
            try {
                const { firstName, lastName, age, email, role } = req.session.user;
                const userDTO = new UserDTO({ firstName, lastName, age, email, role });
                const user = {
                    firstName: userDTO.firstName,
                    lastName: userDTO.lastName,
                    age: userDTO.age,
                    email: userDTO.email,
                    cartID: userDTO.cartID,
                    role: userDTO.role,
                };
                return res.status(200).json({ user: user });
            } catch (e) {
                logger.info(e);
            }
    }
}

export const sessionsController = new SessionsController()