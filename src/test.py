import unittest
import database_commands.database_manager as db_manager
import database_commands.tasks as tasks
import database_commands.admin as admin
from werkzeug.security import generate_password_hash

class TestDatabaseManager(unittest.TestCase):

    def setUp(self):
        self.db = db_manager.DatabaseManager('localhost', 'root', 'admin', 'tasks')

    def test_connection(self):
        connection = self.db.get_connection()
        self.assertIsNotNone(connection)
        self.assertTrue(connection.is_connected())

    def test_add_task(self):
        self.assertEqual(tasks.TaskModel.Create(self, 'Test Task', 'This is a test task', '2024-12-31', 'False'), True)

    def test_get_all_tasks(self):
        all_tasks = tasks.TaskModel.GetAll(self)
        self.assertIsInstance(all_tasks, list)
    
    def test_update_task(self):
        self.assertEqual(tasks.TaskModel.Update(self, 1, 'Updated Task', 'This task has been updated', '2025-01-31', 'True'), True)

    def test_delete_task(self):
        self.assertEqual(tasks.TaskModel.Delete(self, 1), True)

    def test_add_admin(self):
        admin_user = admin.AdminModel.Insert(self, 'admin', 'password123')
        self.assertIsInstance(admin_user, dict)

    def test_get_admin_by_id(self):
        admin_user = admin.AdminModel.GetById(self, 1)
        self.assertIsInstance(admin_user, dict)
    
    def test_get_all_admins(self):
        all_admins = admin.AdminModel.GetAll(self)
        self.assertIsInstance(all_admins, list)

    '''def test_update_admin_name(self):
        admin_user = admin.AdminModel.UpdateName(self, 1, 'admin_updated')
        self.assertTrue(admin_user)

    def test_update_admin_password(self):
        admin_user = admin.AdminModel.UpdatePassword(self, 1, generate_password_hash('newpassword123'))
        self.assertTrue(admin_user)'''

    def test_delete_admin(self):
        self.assertEqual(admin.AdminModel.Delete(self, 1), True)

        

if __name__ == '__main__':
    unittest.main()
