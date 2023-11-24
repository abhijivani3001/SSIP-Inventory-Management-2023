import { useEffect, useState } from 'react';
import axios from '../../../api/AxiosUrl';
import ShowAdminPlans from './ShowAdminPlans';
import CreateAdminPlan from './CreateAdminPlan';
import Loader from '../../../components/ChakraUI/Loader';

const AdminPlan = () => {
  const [currentPlan, setCurrentPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const res = await axios.get('/api/plan');
      console.log(res);
      if (res.data.success) {
        setCurrentPlan(res.data.plan);
      }
      setIsLoading(false);
    })();
  }, []);

  return (
    <>
      {isLoading && <Loader />}
      {!isLoading && (
        <div>
          {currentPlan ? (
            <ShowAdminPlans currentPlan={currentPlan} />
          ) : (
            <CreateAdminPlan />
          )}
        </div>
      )}
    </>
  );
};

export default AdminPlan;
