/*
 * Copyright (C) 2026 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

export {
  STUDENT_ANTI_DISTRACTION_FOCUS_BODY_CLASS,
  STUDENT_ANTI_DISTRACTION_FOCUS_MOUNT_ID,
  STUDENT_ANTI_DISTRACTION_FOCUS_SESSION_KEY,
} from './constants'
export {applyBodyFocusClass} from './applyBodyFocusClass'
export {isStudentAntiDistractionFocusEligible} from './isEligible'
export {useStudentAntiDistractionFocus} from './useStudentAntiDistractionFocus'
export {StudentAntiDistractionFocusControl} from './StudentAntiDistractionFocusControl'
export {mountStudentAntiDistractionFocus} from './mountStudentAntiDistractionFocus'
