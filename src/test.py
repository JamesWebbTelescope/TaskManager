import unittest
import database_commands.database_manager as db_manager
import database_commands.tasks as tasks

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
        

if __name__ == '__main__':
    unittest.main()
