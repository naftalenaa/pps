import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog";
import { Button } from './ui/button';

const OfflineDialog = ({ isOffline }) => (
  <Dialog open={isOffline}>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>No Internet Connection</DialogTitle>
        <DialogDescription>
          It seems you are offline. Please check your internet connection and try again.
        </DialogDescription>
      </DialogHeader>
      <Button
        variant="default"
        className="w-full"
        onClick={() => window.location.reload()}
      >
        Retry
      </Button>
    </DialogContent>
  </Dialog>
);

export default OfflineDialog;
