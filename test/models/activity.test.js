const utils = require('../utils.js')

describe('Activity', () => {
  const Activity = utils.models.Activity
  const mongoose = utils.mongoose
  const ObjectId = mongoose.Types.ObjectId

  describe('.createByParameters', () => {
    describe('correct parameters', () => {
      it('should create', () => {
        const userId = ObjectId()
        const targetId = ObjectId()

        const parameters = {
          user: userId,
          targetModel: 'Page',
          target: targetId,
          action: 'COMMENT',
        }

        return Activity.createByParameters(parameters).then(
          function(activity) {
            expect(activity.user).toBe(userId)
            expect(activity.target).toBe(targetId)
            expect(activity.targetModel).toBe('Page')
            expect(activity.action).toBe('COMMENT')
          },
          function(err) {
            throw new Error(err)
          },
        )
      })
    })

    describe('invalid parameters', () => {
      it('should not create', () => {
        const userId = ObjectId()
        const targetId = ObjectId()

        const parameters = {
          user: userId,
          targetModel: 'Page2', // validation error
          target: targetId,
          action: 'COMMENT',
        }

        return Activity.createByParameters(parameters).then(
          function(activity) {
            throw new Error('not fulfilled')
          },
          function(err) {
            expect(err.message).toBe('Activity validation failed')
          },
        )
      })
    })
  })

  describe('.removeByParameters', () => {
    describe('correct parameters', () => {
      const user = ObjectId()
      const target = ObjectId()
      const parameters = { user, targetModel: 'Page', target, action: 'COMMENT' }

      beforeAll(async () => {
        await Activity.createByParameters(parameters)
      })

      it('should remove', async () => {
        const { result } = await Activity.removeByParameters(parameters)
        expect(result).toEqual({ n: 1, ok: 1 })
      })
    })
  })
})
