import React, { createContext } from 'react';
import { userInfo } from 'os';
import api from '../services/api';

interface AuthContectData {
  name: string;
}
